package com.fitnesstracker.service;

import com.fitnesstracker.dto.MealDto;
import com.fitnesstracker.model.Meal;
import com.fitnesstracker.model.User;
import com.fitnesstracker.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class MealService {

    private final MealRepository mealRepository;
    private final UserService userService;

    @Autowired
    public MealService(MealRepository mealRepository, UserService userService) {
        this.mealRepository = mealRepository;
        this.userService = userService;
    }

    public MealDto addMeal(MealDto dto) {
        User user = userService.getUserEntity(dto.getUserId());
        Meal meal = new Meal(
                dto.getFoodName().trim(),
                dto.getCalories(),
                dto.getProtein(),
                dto.getMealType() != null ? dto.getMealType().trim() : "Lunch",
                dto.getDate() != null ? dto.getDate() : LocalDate.now(),
                user
        );
        Meal saved = mealRepository.save(meal);
        return mapToDto(saved);
    }

    public List<MealDto> getMealsByUserAndDate(Long userId, LocalDate date) {
        return mealRepository.findByUserIdAndDateOrderByDateDescIdDesc(userId, date)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<MealDto> getAllMealsByUser(Long userId) {
        return mealRepository.findByUserIdOrderByDateDescIdDesc(userId)
                .stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public MealDto updateMeal(Long id, MealDto dto) {
        Meal meal = mealRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Meal not found with id: " + id));

        meal.setFoodName(dto.getFoodName().trim());
        meal.setCalories(dto.getCalories());
        meal.setProtein(dto.getProtein());
        if (dto.getMealType() != null) {
            meal.setMealType(dto.getMealType().trim());
        }
        if (dto.getDate() != null) {
            meal.setDate(dto.getDate());
        }

        Meal updated = mealRepository.save(meal);
        return mapToDto(updated);
    }

    public void deleteMeal(Long id) {
        if (!mealRepository.existsById(id)) {
            throw new IllegalArgumentException("Meal not found with id: " + id);
        }
        mealRepository.deleteById(id);
    }

    private MealDto mapToDto(Meal meal) {
        return new MealDto(
                meal.getId(),
                meal.getFoodName(),
                meal.getCalories(),
                meal.getProtein(),
                meal.getMealType(),
                meal.getDate(),
                meal.getUser().getId()
        );
    }
}
