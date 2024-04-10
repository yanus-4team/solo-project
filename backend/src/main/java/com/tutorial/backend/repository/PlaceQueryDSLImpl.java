package com.tutorial.backend.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
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
    public List<Place> findPlaceListByMemberId(Long memberId) {
        return query.select(place)
                .from(place)
                .where(place.placeHeader.member.id.eq(memberId))
                .fetch();
    }
}
