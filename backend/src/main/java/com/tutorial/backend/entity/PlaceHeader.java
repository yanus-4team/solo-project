package com.tutorial.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
@NoArgsConstructor
@Table(name = "tbl_place_header")
@Entity
public class PlaceHeader {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String headerName;

    private int headerSatisfaction;

    private LocalDateTime headerStartDateTime;

    private LocalDateTime headerEndDateTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToMany(mappedBy = "placeHeader", cascade = CascadeType.REMOVE, fetch = FetchType.LAZY)
    private List<Place> placeList;






}
