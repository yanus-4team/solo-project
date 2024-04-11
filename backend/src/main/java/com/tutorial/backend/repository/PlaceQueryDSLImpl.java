package com.tutorial.backend.repository;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.tutorial.backend.controller.dto.MyPlaceDto;
import com.tutorial.backend.entity.Place;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

import static com.tutorial.backend.entity.QPlace.place;

@Repository
@RequiredArgsConstructor
public class PlaceQueryDSLImpl implements PlaceQueryDSL {

    private final JPAQueryFactory query;

    @Override
    public List<MyPlaceDto> findPlaceListByMemberId(Long memberId) {
        return query
                .select(Projections.constructor(MyPlaceDto.class,
                place.id,
                place.placeName,
                place.placeLatitude,
                place.placeLongtitude,
                place.placeStreetNameAddress,
                place.placeLocalNameAddress))
                .from(place)
                .where(place.placeHeader.member.id.eq(memberId))
                .fetch();
    }
}
