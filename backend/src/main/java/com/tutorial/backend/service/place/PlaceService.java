package com.tutorial.backend.service.place;

import com.tutorial.backend.controller.dto.PlaceDto;
import com.tutorial.backend.entity.Place;

import java.util.List;

public interface PlaceService {
    void saveOnePlace(Long placeHeaderId, PlaceDto placeDto);

    List<Place> getPlaceListByMemberId(Long memberId);

    List<Place> getAll();
    default Place toEntity(PlaceDto placeDto){
        return Place.builder()
                .placeName(placeDto.getName())
                .placeLatitude(placeDto.getLatitude())
                .placeLongtitude(placeDto.getLongitude())
                .placeLocalNameAddress(placeDto.getAddress())
                .placeStreetNameAddress(placeDto.getRoadAddress())
                .build();
    }

}
