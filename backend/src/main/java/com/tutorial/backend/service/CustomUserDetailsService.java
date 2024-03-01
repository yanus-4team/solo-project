package com.tutorial.backend.service;

import com.tutorial.backend.entity.Member;
import com.tutorial.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Member member = memberRepository.findByMemberEmail(username);
        return createUserDetails(member);
    }

    // DB 에 User 값이 존재한다면 UserDetails 객체로 만들어서 리턴
    private UserDetails createUserDetails(Member member) {
        // 사용자 권한 정보를 가져와서 GrantedAuthority 객체로 변환
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString());

        // Spring Security UserDetails 객체 생성
        return new User(
                member.getMemberEmail(),
                member.getMemberPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
