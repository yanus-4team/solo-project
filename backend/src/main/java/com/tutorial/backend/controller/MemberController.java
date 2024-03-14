package com.tutorial.backend.controller;

import com.tutorial.backend.controller.dto.LoginForm;
import com.tutorial.backend.service.MemberService;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.service.email.MailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/*")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000") // 허용할 출처
public class MemberController {

    private final MemberService memberService;

    private final HttpSession httpSession;

    @PostMapping("join")
    public ResponseEntity<?> join(@RequestBody LoginForm loginForm) {
        try {
            log.info(loginForm.toString());
            Member member = memberService.saveMember(loginForm);
            return ResponseEntity.ok().body("회원가입을 축하합니다!");
        } catch (Exception e) {
            // 예외가 발생한 경우 처리
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("가입 실패했어요");
        }
    }


}
