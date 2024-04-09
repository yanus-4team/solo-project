package com.tutorial.backend.service;

import com.tutorial.backend.controller.dto.JoinForm;
import com.tutorial.backend.entity.Member;

import java.util.Optional;

public interface MemberService {
    Optional<Member> getMemberByEmail(String memberEmail);

    Member saveMember(JoinForm loginForm);

    Boolean isNicknameOk(String nickname);

    Optional<Member> getMemberByMemberEmailAndProvider(String memberEmail, String memberProvider);

    Optional<Member> getMemberByMemberEmailAndPassword(String memberEmail, String memberPassword);

    default Member toEntity(JoinForm loginForm){
        return Member.builder().memberEmail(loginForm.getEmail())
                .memberPassword(loginForm.getPassword())
                .build();
    }
}
