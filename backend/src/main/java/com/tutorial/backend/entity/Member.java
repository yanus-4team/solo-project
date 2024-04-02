package com.tutorial.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor
@Table(name = "tbl_member")
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String memberEmail;

    private String memberPassword;

    private String memberName;

    private String memberNickName;

    private String memberPhone;

    private LocalDate memberBirth;

    @Enumerated(EnumType.STRING)
    private StatusType status;

    @Enumerated(EnumType.STRING)
    private Authority authority;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    @JsonBackReference
    private List<PlaceHeader> placeHeaderList;


    @Builder
    public Member(Long id, String memberEmail, String memberPassword, String memberName, String memberNickName, String memberPhone, LocalDate memberBirth, StatusType status, Authority authority) {
        this.id = id;
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberNickName = memberNickName;
        this.memberPhone = memberPhone;
        this.memberBirth = memberBirth;
        this.status = status;
        this.authority = authority;
    }

    public void setMemberStatus(StatusType status) {
        this.status = status;
    }
}
