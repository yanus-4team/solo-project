package com.tutorial.backend.serviceTests;

import com.tutorial.backend.service.place.PlaceService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Slf4j
public class PlaceServiceTest {

    @Autowired
    private PlaceService placeService;

    @Test
    public void placeTest(){
        log.info(placeService.getAll().toString());
    }
}
