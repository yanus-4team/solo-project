package com.tutorial.backend.controller.dto;


import com.tutorial.backend.entity.Place;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@Builder
public class PlaceDto {
    private String name;
    private double latitude;
    private double longitude;
    private String roadAddress;
    private String address;

    @Builder
    public PlaceDto(String name, double latitude, double longitude, String roadAddress, String address) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.roadAddress = roadAddress;
        this.address = address;
    }

}
