package com.tutorial.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Table(name = "tbl_place")
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placeName;

    private String placeLatitude;

    private String placeLongtitude;

    private String placeStreetNameAddress;

    private String placeLocalNameAddress;


}
