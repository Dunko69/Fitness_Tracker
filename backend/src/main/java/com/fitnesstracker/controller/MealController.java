package com.fitnesstracker.controller;

import com.fitnesstracker.dto.MealDto;
import com.fitnesstracker.service.MealService;
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
@RequestMapping("/api/meals")
@CrossOrigin(origins = "*")
public class MealController {

    private final MealService mealService;

    @Autowired
    public MealController(MealService mealService) {
        this.mealService = mealService;
    }

    @PostMapping
    public ResponseEntity<MealDto> addMeal(@Valid @RequestBody MealDto mealDto) {
        MealDto createdMeal = mealService.addMeal(mealDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdMeal);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<MealDto>> getMealsByUser(
            @PathVariable Long userId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        if (date != null) {
            return ResponseEntity.ok(mealService.getMealsByUserAndDate(userId, date));
        }
        return ResponseEntity.ok(mealService.getAllMealsByUser(userId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MealDto> updateMeal(
            @PathVariable Long id,
            @Valid @RequestBody MealDto mealDto) {
        MealDto updatedMeal = mealService.updateMeal(id, mealDto);
        return ResponseEntity.ok(updatedMeal);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteMeal(@PathVariable Long id) {
        mealService.deleteMeal(id);
        return ResponseEntity.ok(Map.of("message", "Meal deleted successfully with id: " + id));
    }
}
