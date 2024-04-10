package com.tutorial.backend.service.member;

import com.tutorial.backend.controller.dto.JoinForm;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.repository.MemberRepository;
import com.tutorial.backend.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
@Slf4j
public class MemberServiceImpl implements MemberService {
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

    @Override
    public Boolean isNicknameOk(String nickname) {
        return memberRepository.existsByMemberNickName(nickname);
    }

    @Override
    public Optional<Member> getMemberByMemberEmailAndProvider(String memberEmail, String memberProvider) {
        return memberRepository.findByMemberEmailAndMemberProvider(memberEmail, memberProvider);
    }

    @Override
    public Optional<Member> getMemberByMemberEmailAndPassword(String memberEmail, String memberPassword) {
        return memberRepository.findByMemberEmailAndMemberPassword(memberEmail, memberPassword);
    }

    @Override
    public Optional<Member> getMemberById(Long id) {
        return memberRepository.findById(id);
    }


}
