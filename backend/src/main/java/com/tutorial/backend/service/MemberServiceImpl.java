package com.tutorial.backend.service;

import com.tutorial.backend.controller.dto.JoinForm;
import com.tutorial.backend.controller.dto.OAuthAttributes;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.provider.MemberDetail;
import com.tutorial.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
@Slf4j
public class MemberServiceImpl   implements MemberService, OAuth2UserService<OAuth2UserRequest, OAuth2User> {
    private final MemberRepository memberRepository;


    @Override
    public Optional<Member> getMemberByEmail(String memberEmail) {
        return Optional.ofNullable(memberRepository.findByMemberEmail(memberEmail));
    }

    @Override
    public Member saveMember(JoinForm loginForm) {
        memberRepository.save(toEntity(loginForm));
        return toEntity(loginForm);
    }

    //    spring security에서 DBMS의 회원 정보를 가져올 때 사용될 메소드
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findAllByMemberEmail(username).orElseThrow(() ->
                new UsernameNotFoundException(username+"not Found"));
        return MemberDetail.builder()
                .memberId(member.getMemberEmail())
                .memberPassword(member.getMemberPassword())
                .authority(member.getAuthority())
                .build();
    }


    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//        로그인 완료 후 정보를 담기 위한 준비
        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
//        로그인된 사용자의 정보 불러오기
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

//      어떤 기업의 OAuth를 사용했는 지를 구분(naver, kakao, mac, facebook, ...)
//        member = save(attribute)

        String registrationId = userRequest.getClientRegistration().getRegistrationId();

        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        OAuthAttributes attributes = OAuthAttributes.of(registrationId,userNameAttributeName,oAuth2User.getAttributes());

        Member member = saveOrUpdate(attributes);

        if(member.getId() == null){
            memberRepository.save(member);
        }else{
            member.update(attributes.getName(), attributes.getMobile(), attributes.getEmail());
        }


        log.info("================================================");


        log.info("================================================");

//        OAuth를 통해 전달받은 정보를 DTO로 변환하여 session에 저장
//        session에 객체를 저장하기 위해 직렬화 사용
//        다시 가져올 때에는 역직렬화를 통해 원본 객체를 생성
//        세션에 정보 한 개를 담아놓고 매번 SELECT 쿼리를 발생 시키는 것 보다
//        전체 정보를 담는 객체를 세션에 저장하는 것이 성능상 좋다.

        return
                new DefaultOAuth2User(Collections
                        .singleton(
                                new SimpleGrantedAuthority(
                                        member
                                                .getAuthority()
                                                .getSecurityRole()))
                        , attributes.getAttributes(), attributes.getNameAttributeKey());
    }

    @Transactional
//    변경감지는 트랜잭셔널이 있어야 영속상태 유지가 가능함. 사용하는 곳에서 전부 써야함
    public Member saveOrUpdate(OAuthAttributes authAttributes){
        Optional<Member> memberForSavingOrUpdate = memberRepository
                .findAllByMemberEmail(authAttributes.getEmail());
        Member member = null;
        if(memberForSavingOrUpdate.isPresent()){
            member  = memberForSavingOrUpdate.get();
            memberForSavingOrUpdate.get().setMemberName(authAttributes.getName());
        }
        else{
            member  = authAttributes.toEntity();
        }
        return member;
    }



}
