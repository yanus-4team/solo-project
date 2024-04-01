package com.tutorial.backend.controller;

import com.tutorial.backend.controller.dto.ResultDto;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/member/*")
@Slf4j
@CrossOrigin(origins = "http://localhost:3000") // 허용할 출처
public class MemberController {

    private final MemberService memberService;



}
