package com.fitnesstracker.repository;

import com.fitnesstracker.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
    List<Workout> findByUserIdOrderByDateDescIdDesc(Long userId);
    List<Workout> findByUserIdAndDateOrderByDateDescIdDesc(Long userId, LocalDate date);
}
