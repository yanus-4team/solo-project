package com.tutorial.backend.controller;


import com.tutorial.backend.controller.dto.PlaceDto;
import com.tutorial.backend.service.place.PlaceService;
import com.tutorial.backend.service.placeHeader.PlaceHeaderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/place")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

    private final PlaceService placeService;
    private final PlaceHeaderService placeHeaderService;

    public ResponseEntity<String> saveOnePlace(@RequestBody PlaceDto placeDto){
        placeService.


    };


}
