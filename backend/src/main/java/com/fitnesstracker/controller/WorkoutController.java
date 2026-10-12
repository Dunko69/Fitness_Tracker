package com.fitnesstracker.controller;

import com.fitnesstracker.dto.WorkoutDto;
import com.fitnesstracker.service.WorkoutService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/workouts")
@CrossOrigin(origins = "*")
public class WorkoutController {

    private final WorkoutService workoutService;

    @Autowired
    public WorkoutController(WorkoutService workoutService) {
        this.workoutService = workoutService;
    }

    @PostMapping
    public ResponseEntity<WorkoutDto> addWorkout(@Valid @RequestBody WorkoutDto workoutDto) {
        WorkoutDto created = workoutService.addWorkout(workoutDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<WorkoutDto>> getWorkoutsByUser(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date != null) {
            return ResponseEntity.ok(workoutService.getWorkoutsByUserAndDate(userId, date));
        }
        return ResponseEntity.ok(workoutService.getAllWorkoutsByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<WorkoutDto> updateWorkout(
            @PathVariable Long id,
            @Valid @RequestBody WorkoutDto workoutDto) {
        WorkoutDto updated = workoutService.updateWorkout(id, workoutDto);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteWorkout(@PathVariable Long id) {
        workoutService.deleteWorkout(id);
        return ResponseEntity.ok(Map.of("message", "Workout deleted successfully with id: " + id));
    }
}
