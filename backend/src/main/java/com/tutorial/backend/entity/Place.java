package com.tutorial.backend.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor
@Table(name = "tbl_place")
@Entity
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String placeName;

    private double placeLatitude;

    private double placeLongtitude;

    private String placeStreetNameAddress;

    private String placeLocalNameAddress;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_header_id")
    private PlaceHeader placeHeader;

    @Builder
    public Place(Long id, String placeName, double placeLatitude, double placeLongtitude, String placeStreetNameAddress, String placeLocalNameAddress, PlaceHeader placeHeader) {
        this.id = id;
        this.placeName = placeName;
        this.placeLatitude = placeLatitude;
        this.placeLongtitude = placeLongtitude;
        this.placeStreetNameAddress = placeStreetNameAddress;
        this.placeLocalNameAddress = placeLocalNameAddress;
        this.placeHeader = placeHeader;
    }
    @Override
    public String toString() {
        return "Place{" +
                "id=" + id +
                ", placeName='" + placeName + '\'' +
                ", placeLatitude='" + placeLatitude + '\'' +
                ", placeLongitude='" + placeLongtitude + '\'' +
                ", placeStreetNameAddress='" + placeStreetNameAddress + '\'' +
                ", placeLocalNameAddress='" + placeLocalNameAddress + '\'' +
                '}';
    }

}
