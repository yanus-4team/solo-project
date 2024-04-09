package com.tutorial.backend.repository;

import com.tutorial.backend.entity.Message;
import com.tutorial.backend.entity.PlaceHeader;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceHeaderRepository extends JpaRepository<PlaceHeader,Long> {
}
