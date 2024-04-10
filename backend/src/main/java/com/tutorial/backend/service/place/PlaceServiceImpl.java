package com.tutorial.backend.service.place;

import com.tutorial.backend.controller.dto.PlaceDto;
import com.tutorial.backend.entity.Place;
import com.tutorial.backend.entity.PlaceHeader;
import com.tutorial.backend.repository.PlaceHeaderRepository;
import com.tutorial.backend.repository.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional(readOnly = false)
public class PlaceServiceImpl implements PlaceService {

    private final PlaceRepository placeRepository;
    private final PlaceHeaderRepository placeHeaderRepository;

    @Override
    public void saveOnePlace(Long placeHeaderId, PlaceDto placeDto) {
        Place place = toEntity(placeDto);
        Optional<PlaceHeader> foundPlaceHeader = placeHeaderRepository.findById(placeHeaderId);
        if(foundPlaceHeader.isPresent()){
            place.setPlaceHeader(foundPlaceHeader.get());
            placeRepository.save(place);
        }

    }


    @Override
    public List<Place> getPlaceListByMemberId(Long memberId) {
        return placeRepository.findPlaceListByMemberId(memberId);
    }

    @Override
    public List<Place> getAll() {
        return placeRepository.findAll();
    }

}
