package com.tutorial.backend.repository;

import com.tutorial.backend.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Member findByMemberEmail(String memberEmail);
    boolean existsByMemberEmail(String memberEmail);
}
