package com.tutorial.backend.provider;
import com.tutorial.backend.entity.Authority;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Collection;

@Component
@Getter
@ToString
@NoArgsConstructor(access = AccessLevel.PROTECTED)
// 직렬화 : 객체를 세션에 담을 떄 주소가아닌 실제 필드의 데이터들을 담아놔야 한다.
// 이 때 XML 또는 JSON 형식으로 담기고 이를 직렬화라고 한다.
// 나중에 세션에서 다시 객체를 가져올 때에는 해당 데이터를 새로운 객체의 필드에 주입하며,
// 이를 역직렬화 라고 한다.
public class MemberDetail implements UserDetails , Serializable {
    private Long id;
    private String memberId;
    private String memberPassword;
    private Authority authority;
    private Collection<? extends GrantedAuthority> authorities;

    @Builder
    public MemberDetail(Long id, String memberId, String memberPassword, Authority authority) {
        this.id = id;
        this.memberId = memberId;
        this.memberPassword = memberPassword;
        this.authority = authority;
        this.authorities = AuthorityUtils.createAuthorityList(authority.getSecurityRole());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return memberPassword;
    }

    @Override
    public String getUsername() {
        return memberId;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    //    동시 로그인 막기
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}