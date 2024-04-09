package com.tutorial.backend.controller.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class PlaceDto {
    private String name;
    private String latitude;
    private String longitude;
    private String roadAddress;
    private String address;

    @Builder
    public PlaceDto(String name, String latitude, String longitude, String roadAddress, String address) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.roadAddress = roadAddress;
        this.address = address;
    }


}
