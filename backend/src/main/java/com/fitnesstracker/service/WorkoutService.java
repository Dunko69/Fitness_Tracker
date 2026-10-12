package com.fitnesstracker.service;

import com.fitnesstracker.dto.WorkoutDto;
import com.fitnesstracker.model.User;
import com.fitnesstracker.model.Workout;
import com.fitnesstracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class WorkoutService {

    private final WorkoutRepository workoutRepository;
    private final UserService userService;

    @Autowired
    public WorkoutService(WorkoutRepository workoutRepository, UserService userService) {
        this.workoutRepository = workoutRepository;
        this.userService = userService;
    }

    public WorkoutDto addWorkout(WorkoutDto dto) {
        User user = userService.getUserEntity(dto.getUserId());
        Workout workout = new Workout(
                dto.getExerciseName().trim(),
                dto.getDurationMinutes(),
                dto.getCaloriesBurned(),
                dto.getCategory() != null ? dto.getCategory().trim() : "Cardio",
                dto.getDate() != null ? dto.getDate() : LocalDate.now(),
                user
        );
        Workout saved = workoutRepository.save(workout);
        return mapToDto(saved);
    }

    public List<WorkoutDto> getWorkoutsByUserAndDate(Long userId, LocalDate date) {
        return workoutRepository.findByUserIdAndDateOrderByDateDescIdDesc(userId, date)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<WorkoutDto> getAllWorkoutsByUser(Long userId) {
        return workoutRepository.findByUserIdOrderByDateDescIdDesc(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public WorkoutDto updateWorkout(Long id, WorkoutDto dto) {
        Workout workout = workoutRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Workout not found with id: " + id));

        workout.setExerciseName(dto.getExerciseName().trim());
        workout.setDurationMinutes(dto.getDurationMinutes());
        workout.setCaloriesBurned(dto.getCaloriesBurned());
        if (dto.getCategory() != null) {
            workout.setCategory(dto.getCategory().trim());
        }
        if (dto.getDate() != null) {
            workout.setDate(dto.getDate());
        }

        Workout updated = workoutRepository.save(workout);
        return mapToDto(updated);
    }

    public void deleteWorkout(Long id) {
        if (!workoutRepository.existsById(id)) {
            throw new IllegalArgumentException("Workout not found with id: " + id);
        }
        workoutRepository.deleteById(id);
    }

    private WorkoutDto mapToDto(Workout workout) {
        return new WorkoutDto(
                workout.getId(),
                workout.getExerciseName(),
                workout.getDurationMinutes(),
                workout.getCaloriesBurned(),
                workout.getCategory(),
                workout.getDate(),
                workout.getUser().getId()
        );
    }
}
