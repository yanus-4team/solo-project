package com.tutorial.backend.controller;


import com.tutorial.backend.controller.dto.*;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.exception.SpecificMailServiceException;
import com.tutorial.backend.service.AuthService;
import com.tutorial.backend.service.email.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;
    private final MailService mailService;

    @PostMapping("verifyEmail")
    public ResponseEntity<ResultDto<String>> emailCheck(@RequestBody String email) {
        log.info(email);
        Optional<Member> existingMember = authService.getMemberByEmail(email);
        if (existingMember.isPresent()) {
            return ResponseEntity.badRequest().body(ResultDto.res(HttpStatus.BAD_REQUEST, "이메일이 이미 존재합니다."));
        } else {
            try {
                String code = mailService.sendSimpleMessage(email);
                if (code != null) {
                    return ResponseEntity.ok().body(ResultDto.res(HttpStatus.OK, "이메일을 보냈습니다", code));
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body(ResultDto.res(HttpStatus.INTERNAL_SERVER_ERROR, "이메일을 보내지 못했습니다. 다시 시도해주세요"));
                }
            } catch (Exception exception) {
                log.error("An unexpected error occurred while sending verification email.", exception);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(ResultDto.res(HttpStatus.INTERNAL_SERVER_ERROR, "예상치 못한 문제가 생겼습니다. 다시 시도해주세요"));
            }
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<ResultDto<String>> signUp(@RequestBody JoinForm joinForm) {
        try {
            log.info(joinForm.toString());
            MemberResponseDto member = authService.signup(joinForm);
            return ResponseEntity.ok().body(ResultDto.res(HttpStatus.OK, "회원가입을 축하합니다!"));
        } catch (Exception e) {
            // 예외가 발생한 경우 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResultDto.res(HttpStatus.INTERNAL_SERVER_ERROR, "가입 실패했어요"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody JoinForm joinForm) {
        log.info(authService.login(joinForm).toString());
        return ResponseEntity.ok(authService.login(joinForm));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
    @GetMapping("user")
    public ResponseEntity<ResultDto<Member>> getUserDetails(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        // 사용자 정보를 기반으로 회원 정보를 조회하여 반환
        try{
            Optional<Member> member = authService.getMemberByEmail(userDetails.getUsername());
            if(member.isPresent()){
                return ResponseEntity.ok().body(ResultDto.res(HttpStatus.ACCEPTED, "회원정보를 조회해왔습니다", member.get()));
            }else{
                return ResponseEntity.badRequest().body(ResultDto.res(HttpStatus.NOT_FOUND, "회원이 존재하지 않습니다."));
            }
        } catch (Exception exception) {
            log.error("An unexpected error occurred while sending verification email.", exception);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResultDto.res(HttpStatus.INTERNAL_SERVER_ERROR, "예상치 못한 문제가 생겼습니다. 다시 시도해주세요"));
        }
    }

}
