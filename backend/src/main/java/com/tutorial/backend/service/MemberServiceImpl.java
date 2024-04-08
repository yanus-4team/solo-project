package com.tutorial.backend.service;

import com.tutorial.backend.controller.dto.JoinForm;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
@Slf4j
public class MemberServiceImpl implements MemberService{
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
    public Optional<Member> getMemberByMemberEmailAndProvider(String memberEmail, String memberProvider) {
        return memberRepository.findByMemberEmailAndMemberProvider(memberEmail, memberProvider);
    }


}
