package com.tutorial.backend.controller.dto;


import com.tutorial.backend.entity.Authority;
import com.tutorial.backend.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@Getter
@ToString
@NoArgsConstructor
public class JoinForm {
    private String email;
    private String password;
    private String name;
    private String phoneNum;
    private String nickName;
    private LocalDate birth;


    @Builder
    public JoinForm(String email, String password, String name, String phoneNum, String nickName, LocalDate birth) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.phoneNum = phoneNum;
        this.nickName = nickName;
        this.birth = birth;
    }

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberEmail(email)
                .memberPassword(passwordEncoder.encode(password))
                .memberBirth(birth)
                .memberNickName(nickName)
                .memberName(name)
                .memberPhone(phoneNum)
                .authority(Authority.USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
