package com.tutorial.backend.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpSession;

@Controller
@Slf4j
//OAuth 로그인시 오는 컨트롤러
public class OAuthController {
    @GetMapping("/")
    public RedirectView goToMain(HttpSession session, RedirectAttributes attributes){
        log.info("OAuth 로그인 성공!");
        MemberDTO memberDTO = ((MemberDTO)session.getAttribute("member"));
        if(memberDTO.getMemberBirth() == null){
            attributes.addFlashAttribute("member",memberDTO);
            return new RedirectView("/member/join");
        }
        return new RedirectView("/board/list");
    }


}
