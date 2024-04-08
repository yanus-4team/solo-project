package com.tutorial.backend.entity;

import lombok.*;


import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "tbl_member")
@Entity
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
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

    private String memberProvider;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<PlaceHeader> placeHeaderList;

    @OneToMany(mappedBy = "member", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Report> reportList;

    @Builder
    public Member(Long id, String memberEmail, String memberPassword, String memberName, String memberNickName, String memberPhone, LocalDate memberBirth, StatusType status, Authority authority, String memberProvider, List<PlaceHeader> placeHeaderList, List<Report> reportList) {
        this.id = id;
        this.memberEmail = memberEmail;
        this.memberPassword = memberPassword;
        this.memberName = memberName;
        this.memberNickName = memberNickName;
        this.memberPhone = memberPhone;
        this.memberBirth = memberBirth;
        this.status = status;
        this.authority = authority;
        this.memberProvider = memberProvider;
        this.placeHeaderList = placeHeaderList;
        this.reportList = reportList;
    }


    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }

    public void setMemberPassword(String memberPassword) {
        this.memberPassword = memberPassword;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public void setMemberNickName(String memberNickName) {
        this.memberNickName = memberNickName;
    }

    public void setMemberPhone(String memberPhone) {
        this.memberPhone = memberPhone;
    }

    public void setMemberBirth(LocalDate memberBirth) {
        this.memberBirth = memberBirth;
    }

    public void setStatus(StatusType status) {
        this.status = status;
    }

    public void setAuthority(Authority authority) {
        this.authority = authority;
    }

    public void setMemberProvider(String memberProvider) {
        this.memberProvider = memberProvider;
    }

    public void setPlaceHeaderList(List<PlaceHeader> placeHeaderList) {
        this.placeHeaderList = placeHeaderList;
    }

    public void setReportList(List<Report> reportList) {
        this.reportList = reportList;
    }

    public Member update(String memberName, String memberPhoneNumber, String memberEmail){
        this.setMemberName(memberName);
        this.setMemberPhone(memberPhoneNumber);
        this.setMemberEmail(memberEmail);
        return this;
    }


    public Member update(String name, String email) {
        this.memberName = name;
        this.memberEmail = email;
        return this;
    }
}
