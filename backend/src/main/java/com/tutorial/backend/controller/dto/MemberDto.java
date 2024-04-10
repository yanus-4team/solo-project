package com.tutorial.backend.controller.dto;


import com.tutorial.backend.entity.Authority;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
public class MemberDto {
    private Long id;
    private String name;
    private String email;
    private String password;
    private Authority authority;

}
