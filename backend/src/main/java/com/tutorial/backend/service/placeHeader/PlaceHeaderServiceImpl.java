package com.tutorial.backend.service.placeHeader;

import com.tutorial.backend.entity.PlaceHeader;
import com.tutorial.backend.repository.PlaceHeaderRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@RequiredArgsConstructor
@Transactional(readOnly = false)
@Slf4j
public class PlaceHeaderServiceImpl implements PlaceHeaderService {

    private final PlaceHeaderRepository placeHeaderRepository;

    @Override
    public PlaceHeader saveOnePlaceHeader(PlaceHeader placeHeader) {
        return placeHeaderRepository.save(placeHeader);
    }
}
