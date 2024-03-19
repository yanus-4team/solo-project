package com.tutorial.backend.controller.dto;


import com.tutorial.backend.entity.Authority;
import com.tutorial.backend.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@ToString
@NoArgsConstructor
public class JoinForm {
    private String email;
    private String password;
    private String name;


    @Builder
    public JoinForm(String email, String password) {
        this.email = email;
        this.password = password;
    }
    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberEmail(email)
                .memberPassword(passwordEncoder.encode(password))
                .authority(Authority.ROLE_USER)
                .build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(email, password);
    }
}
