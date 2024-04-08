package com.tutorial.backend.controller.dto;


import com.tutorial.backend.entity.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberProfile {
    private String name;
    private String email;
    private String provider;
    private String nickname;

    public Member toMember() {
        return Member.builder()
                .memberName(name)
                .memberEmail(email)
                .memberProvider(provider)
                .build();
    }

}