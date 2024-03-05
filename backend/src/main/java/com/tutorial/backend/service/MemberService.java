package com.tutorial.backend.service;

import com.tutorial.backend.controller.dto.LoginForm;
import com.tutorial.backend.entity.Member;

import java.util.Optional;

public interface MemberService {
    Optional<Member> getMemberByEmail(String memberEmail);

    Member saveMember(LoginForm loginForm);


    default Member toEntity(LoginForm loginForm){
        return Member.builder().memberEmail(loginForm.getEmail())
                .memberPassword(loginForm.getPassword())
                .build();
    }
}
