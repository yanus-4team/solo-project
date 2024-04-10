package com.tutorial.backend.repository;

import com.tutorial.backend.entity.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceRepository extends JpaRepository<Place,Long>, PlaceQueryDSL{
}
