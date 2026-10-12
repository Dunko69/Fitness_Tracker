package com.fitnesstracker.service;

import com.fitnesstracker.dto.DailySummaryDto;
import com.fitnesstracker.model.Meal;
import com.fitnesstracker.model.User;
import com.fitnesstracker.model.Workout;
import com.fitnesstracker.repository.MealRepository;
import com.fitnesstracker.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@Transactional(readOnly = true)
public class SummaryService {

    private final UserService userService;
    private final MealRepository mealRepository;
    private final WorkoutRepository workoutRepository;

    @Autowired
    public SummaryService(UserService userService, MealRepository mealRepository, WorkoutRepository workoutRepository) {
        this.userService = userService;
        this.mealRepository = mealRepository;
        this.workoutRepository = workoutRepository;
    }

    public DailySummaryDto getDailySummary(Long userId, LocalDate date) {
        if (date == null) {
            date = LocalDate.now();
        }

        User user = userService.getUserEntity(userId);
        int goal = user.getDailyCalorieGoal();

        List<Meal> meals = mealRepository.findByUserIdAndDateOrderByDateDescIdDesc(userId, date);
        List<Workout> workouts = workoutRepository.findByUserIdAndDateOrderByDateDescIdDesc(userId, date);

        int totalConsumed = meals.stream().mapToInt(Meal::getCalories).sum();
        int totalBurned = workouts.stream().mapToInt(Workout::getCaloriesBurned).sum();
        int netCalories = totalConsumed - totalBurned;

        double totalProtein = meals.stream().mapToDouble(Meal::getProtein).sum();
        totalProtein = Math.round(totalProtein * 10.0) / 10.0; // round to 1 decimal

        double progressPercentage = goal > 0 ? ((double) totalConsumed / goal) * 100.0 : 0.0;
        progressPercentage = Math.round(progressPercentage * 10.0) / 10.0;

        int remainingCalories = goal - totalConsumed;

        String status;
        if (totalConsumed > goal) {
            status = "Calorie Surplus (Goal Exceeded)";
        } else if (totalConsumed == goal) {
            status = "Target Calorie Goal Achieved";
        } else if (netCalories < 0) {
            status = "Active Burn (Net Deficit)";
        } else {
            status = "On Track";
        }

        return new DailySummaryDto(
                date,
                goal,
                totalConsumed,
                totalBurned,
                netCalories,
                totalProtein,
                progressPercentage,
                remainingCalories,
                meals.size(),
                workouts.size(),
                status
        );
    }
}
