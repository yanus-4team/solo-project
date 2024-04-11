package com.tutorial.backend.repository;

import com.tutorial.backend.controller.dto.MyPlaceDto;
import com.tutorial.backend.controller.dto.PlaceDto;
import com.tutorial.backend.entity.Place;

import java.util.List;

public interface PlaceQueryDSL {
    List<MyPlaceDto> findPlaceListByMemberId(Long memberId);

}
