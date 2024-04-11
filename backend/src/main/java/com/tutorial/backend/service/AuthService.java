package com.tutorial.backend.service;

import com.tutorial.backend.controller.dto.JoinForm;
import com.tutorial.backend.controller.dto.MemberResponseDto;
import com.tutorial.backend.controller.dto.TokenDto;
import com.tutorial.backend.controller.dto.TokenRequestDto;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.entity.RefreshToken;
import com.tutorial.backend.entity.StatusType;
import com.tutorial.backend.jwt.TokenProvider;
import com.tutorial.backend.provider.MemberDetail;
import com.tutorial.backend.repository.MemberRepository;
import com.tutorial.backend.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;
    private final RefreshTokenRepository refreshTokenRepository;


    @Transactional
    public Optional<Member> getMemberByEmail(String email) {
        return Optional.ofNullable(memberRepository.findByMemberEmail(email));
    }


    @Transactional
    public MemberResponseDto signup(JoinForm loginForm) {
        if (memberRepository.existsByMemberEmail(loginForm.getEmail())) {
            throw new RuntimeException("이미 가입되어 있는 유저입니다");
        }

        Member member = loginForm.toMember(passwordEncoder);
        member.setStatus(StatusType.ABLE);
        return MemberResponseDto.of(memberRepository.save(member));
    }

    @Transactional
    public TokenDto login(JoinForm loginForm) {
        // 1. Login ID/PW 를 기반으로 AuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken = loginForm.toAuthentication();
        // 2. 실제로 검증 (사용자 비밀번호 체크) 이 이루어지는 부분
        //    authenticate 메서드가 실행이 될 때 CustomUserDetailsService 에서 만들었던 loadUserByUsername 메서드가 실행됨
        log.info("Service login"+authenticationToken.toString());
        MemberDetail authentication =(MemberDetail) authenticationManagerBuilder.getObject().authenticate(authenticationToken).getPrincipal();

        // 3. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 4. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(authentication.getName())
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 5. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDto socialLogin(String email,String provider) {
        // 1. 이메일을 기반으로 사용자 정보 조회
        Optional<Member> member = memberRepository.findByMemberEmailAndMemberProvider(email, provider);

        log.info(member.toString());
        // 2. 사용자 정보가 없으면 예외 처리
        if (member.isEmpty()) {
            throw new RuntimeException("등록되지 않은 사용자입니다.");
        }

        // 3. 사용자 정보를 기반으로 Authentication 객체 생성
        Authentication principal = new UsernamePasswordAuthenticationToken(email, null, null);

        MemberDetail memberDetail = new MemberDetail( member.get()); // 사용자 정보를 생성자에 전달하여 MemberDetail 객체를 생성

        log.info(memberDetail.toString());
        // 4. 인증 정보를 기반으로 JWT 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(memberDetail);

        // 5. RefreshToken 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .key(email) // 사용자의 이메일을 key로 사용합니다.
                .value(tokenDto.getRefreshToken())
                .build();

        refreshTokenRepository.save(refreshToken);

        // 6. 토큰 발급
        return tokenDto;
    }

    @Transactional
    public TokenDto reissue(TokenRequestDto tokenRequestDto) {
        // 1. Refresh Token 검증
        if (!tokenProvider.validateToken(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("Refresh Token 이 유효하지 않습니다.");
        }

        // 2. Access Token 에서 Member ID 가져오기
        MemberDetail authentication =(MemberDetail) tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());

        // 3. 저장소에서 Member ID 를 기반으로 Refresh Token 값 가져옴
        RefreshToken refreshToken = refreshTokenRepository.findByKey(authentication.getName())
                .orElseThrow(() -> new RuntimeException("로그아웃 된 사용자입니다."));

        // 4. Refresh Token 일치하는지 검사
        if (!refreshToken.getValue().equals(tokenRequestDto.getRefreshToken())) {
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");
        }

        // 5. 새로운 토큰 생성
        TokenDto tokenDto = tokenProvider.generateTokenDto(authentication);

        // 6. 저장소 정보 업데이트
        RefreshToken newRefreshToken = refreshToken.updateValue(tokenDto.getRefreshToken());
        refreshTokenRepository.save(newRefreshToken);

        // 토큰 발급
        return tokenDto;
    }


}

