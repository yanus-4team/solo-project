package com.tutorial.backend.controller.dto;


import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.stereotype.Component;

@Component
@Getter
@ToString
@NoArgsConstructor
public class MyPlaceDto {
    private Long id;

    private String name;

    private double latitude;

    private double longitude;

    private String roadAddress;

    private String address;

    @Builder
    public MyPlaceDto(Long id, String name, double latitude, double longitude, String roadAddress, String address) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.roadAddress = roadAddress;
        this.address = address;
    }
}
