package com.tutorial.backend.handler;

import com.tutorial.backend.controller.dto.TokenDto;
import com.tutorial.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Slf4j
@Component
public class MyAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    private static final String REDIRECT_URI = "http://localhost:3000/login/moreInfo";

    @Autowired
    private AuthService authService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {

        Object principal = authentication.getPrincipal();
        if (principal instanceof OAuth2User) {

            OAuth2User oAuth2User = (OAuth2User) principal;
            String email = oAuth2User.getAttribute("email");
            String provider = (String) oAuth2User.getAttribute("provider");
            log.info("");
            TokenDto tokenDto = authService.socialLogin(email,provider); // AuthService를 통해 소셜 로그인 처리
//            String accessToken = tokenDto.getAccessToken();
//            String refreshToken = tokenDto.getRefreshToken();
            System.out.println("SuccessHandler oAuth2User: " + oAuth2User);
//
            String redirectUrl = UriComponentsBuilder.fromUriString(REDIRECT_URI)
//                    .queryParam("accessToken", accessToken)
//                    .queryParam("refreshToken", refreshToken)
                    .build()
                    .encode(StandardCharsets.UTF_8)
                    .toUriString();

            response.sendRedirect(redirectUrl);
        } else {
            throw new IllegalStateException("Authentication principal is not an instance of OAuth2User");
        }
    }
}
