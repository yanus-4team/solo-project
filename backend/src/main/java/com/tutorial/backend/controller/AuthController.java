package com.tutorial.backend.controller;


import com.tutorial.backend.controller.dto.LoginForm;
import com.tutorial.backend.controller.dto.MemberResponseDto;
import com.tutorial.backend.controller.dto.TokenDto;
import com.tutorial.backend.controller.dto.TokenRequestDto;
import com.tutorial.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody LoginForm loginForm) {
        try {
            log.info(loginForm.toString());
            MemberResponseDto member = authService.signup(loginForm);
            return ResponseEntity.ok().body("회원가입을 축하합니다!");
        } catch (Exception e) {
            // 예외가 발생한 경우 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("가입 실패했어요");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginForm loginForm) {
        log.info(authService.login(loginForm).toString());
        return ResponseEntity.ok(authService.login(loginForm));
    }

    @PostMapping("/reissue")
    public ResponseEntity<TokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return ResponseEntity.ok(authService.reissue(tokenRequestDto));
    }
}
