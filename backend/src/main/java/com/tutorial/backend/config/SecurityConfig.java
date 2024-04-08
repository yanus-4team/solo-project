package com.tutorial.backend.config;

import com.tutorial.backend.entity.Authority;
import com.tutorial.backend.handler.MyAuthenticationSuccessHandler;
import com.tutorial.backend.jwt.JwtAccessDeniedHandler;
import com.tutorial.backend.jwt.JwtAuthenticationEntryPoint;
import com.tutorial.backend.jwt.TokenProvider;
import com.tutorial.backend.service.OAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@EnableWebSecurity
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final TokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    private static final String FAVICON_PATH = "/favicon.ico";
    private static final String AUTH_PATH = "/auth/**";
    private static final String OAUTH_PATH = "/oauth/**";
    private static final String MEMBER_PATH = "/member/**";
    private static final String ADMIN_PATH = "/admin/**";

    private final OAuthService oAuthService;



    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .antMatchers(FAVICON_PATH)
                .requestMatchers(PathRequest.toStaticResources().atCommonLocations());
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            // CSRF 설정 Disable
        http
                .cors()
                .and()

                .csrf().disable()

                // exception handling 할 때 만든 클래스를 추가
                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .headers()
                .frameOptions()
                .sameOrigin()

                // 시큐리티는 기본적으로 세션을 사용
                // 여기서는 세션을 사용하지 않기 때문에 세션 설정을 Stateless 로 설정
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                // 로그인, 회원가입 API 는 토큰이 없는 상태에서 요청이 들어오기 때문에 permitAll 설정
                .and()
                .authorizeRequests()
                .antMatchers(AUTH_PATH).permitAll()
                .antMatchers(OAUTH_PATH).permitAll()
                .antMatchers(MEMBER_PATH).hasRole(Authority.USER.name())
                .antMatchers(ADMIN_PATH).hasRole(Authority.USER.name())
                .anyRequest().authenticated()   // 나머지 API 는 전부 인증 필요

                // JwtFilter 를 addFilterBefore 로 등록했던 JwtSecurityConfig 클래스를 적용
                .and()
                .apply(new JwtSecurityConfig(tokenProvider))

                .and()
                .oauth2Login()
//                .defaultSuccessUrl("/oauth/loginInfo", true)
                .successHandler(new MyAuthenticationSuccessHandler())
                .userInfoEndpoint()
                .userService(oAuthService);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }






}
