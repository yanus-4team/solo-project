package com.tutorial.backend.controller.dto;


import com.tutorial.backend.entity.Authority;
import com.tutorial.backend.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.Map;

@Getter
@Builder
@Slf4j
@RequiredArgsConstructor
public class OAuthAttributes {
    private final Map<String , Object> attributes;
    private final String nameAttributeKey;
    private final String name;
    private final String email;
    private final String mobile;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
//        userNameAttributeName 은 yml에 등록되어있는 user-name-attribute 값이다.
        log.info("================={}",userNameAttributeName);

//      registrationId는 네이버 로그인일 경우 naver 이고, 카카오 로그인일 경우 kakao이다.
        log.info("================{}",registrationId);

        if("naver".equals(registrationId)){
            return ofNaver(userNameAttributeName, attributes);
        }else if("google".equals(registrationId)){
            return ofGoogle(userNameAttributeName, attributes);
        }
        return ofKaKao(userNameAttributeName, attributes);

    }
    private static OAuthAttributes ofKaKao(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> kaKaoAccount = (Map<String ,Object>)attributes.get(userNameAttributeName);
        log.info("***************************");
        log.info(kaKaoAccount.toString());
        return OAuthAttributes.builder()
                .email((String)kaKaoAccount.get("email"))
                .name((String) ((Map)kaKaoAccount.get("profile")).get("nickname"))
                .mobile((String) ((Map)kaKaoAccount.get("profile")).get("thumbnail_image_url"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }
    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){

        log.info("***************************");
        log.info(attributes.toString());
        return OAuthAttributes.builder()
                .email((String)attributes.get("email"))
                .name((String)(attributes.get("name")))
                .mobile(null)
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }
    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> naverAccount = (Map<String ,Object>)attributes.get(userNameAttributeName);
        log.info("***************************");
        log.info(naverAccount.toString());
        return OAuthAttributes.builder()
                .email((String)naverAccount.get("email"))
                .name((String)naverAccount.get("name"))
                .mobile((String)naverAccount.get("mobile"))
                .nameAttributeKey(userNameAttributeName)
                .attributes(attributes)
                .build();
    }

    public Member toEntity(){
        return Member.builder()
                .memberName(name)
                .memberEmail(email)
                .memberPhone(mobile)
                .authority(Authority.USER)
                .build();
    }
}
