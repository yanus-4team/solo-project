package com.tutorial.backend.controller;


import com.tutorial.backend.controller.dto.*;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.provider.MemberDetail;
import com.tutorial.backend.service.AuthService;
import com.tutorial.backend.service.member.MemberService;
import com.tutorial.backend.service.email.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    private final AuthService authService;
    private final MailService mailService;
    private final MemberService memberService;

    private static final String REDIRECT_URI = "http://localhost:3000/login/moreInfo";

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
    @PostMapping("/oauth-signup")
    public ResponseEntity<ResultDto<String>> oauthSignUp(@RequestBody JoinForm joinForm) {
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
        return ResponseEntity.ok(authService.login(joinForm));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }

    @GetMapping("/user")
    public ResponseEntity<ResultDto<String>> getUserDetails( Authentication authentication) {
        // 사용자 정보를 기반으로 회원 정보를 조회하여 반환
        MemberDetail principal = (MemberDetail) authentication.getPrincipal();
        try {
            return ResponseEntity.ok()
                    .body(ResultDto.res(HttpStatus.ACCEPTED, "회원정보를 조회해왔습니다", principal.getName()));
        } catch (Exception exception) {
            log.error("회원 정보를 조회하는 중에 오류가 발생했습니다.", exception);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ResultDto.res(HttpStatus.INTERNAL_SERVER_ERROR, "회원 정보를 조회하는 중에 오류가 발생했습니다."));
        }
    }

    @PostMapping("/verifyNickname")
    public ResponseEntity<Boolean> verifyNickname(@RequestBody String nickname){
        log.info(nickname);
        return ResponseEntity.ok().body(memberService.isNicknameOk(nickname));
    }

    @GetMapping("/loginInfo")
    public void createToken(HttpServletResponse response, Authentication authentication) throws IOException{
        //oAuth2User.toString() 예시 : Name: [2346930276], Granted Authorities: [[USER]], User Attributes: [{id=2346930276, provider=kakao, name=김준우, email=bababoll@naver.com}]
            OAuth2User principal = (OAuth2User) authentication.getPrincipal();
            log.info(principal.toString());
            if (principal != null) {

                String email = principal.getAttribute("email");
                String provider = (String) principal.getAttribute("provider");
                TokenDto tokenDto = authService.socialLogin(email, provider); // AuthService를 통해 소셜 로그인 처리
                Optional<Member> foundMember = memberService.getMemberByMemberEmailAndProvider(email,provider);
                boolean isFirst = foundMember.get().getMemberPassword() == null;
                String accessToken = tokenDto.getAccessToken();
                String refreshToken = tokenDto.getRefreshToken();
                System.out.println("SuccessHandler oAuth2User: " + principal);

                String redirectUrl = UriComponentsBuilder.fromUriString(REDIRECT_URI)
                        .queryParam("accessToken", accessToken)
                        .queryParam("refreshToken", refreshToken)
                        .queryParam("isFirst",isFirst)
                        .build()
                        .encode(StandardCharsets.UTF_8)
                        .toUriString();

                response.sendRedirect(redirectUrl);
            } else {
                log.info("principal is null");
            }
    }



}
