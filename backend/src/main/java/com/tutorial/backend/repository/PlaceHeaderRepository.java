package com.tutorial.backend.repository;

import com.tutorial.backend.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlaceHeaderRepository extends JpaRepository<Message,String> {
}
