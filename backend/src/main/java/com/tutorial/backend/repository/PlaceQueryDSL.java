package com.tutorial.backend.repository;

import com.tutorial.backend.entity.Place;

import java.util.List;

public interface PlaceQueryDSL {
    List<Place> findPlaceListByMemberId(Long memberId);

}
