package com.fitnesstracker.config;

import com.fitnesstracker.model.Meal;
import com.fitnesstracker.model.User;
import com.fitnesstracker.model.Workout;
import com.fitnesstracker.repository.MealRepository;
import com.fitnesstracker.repository.UserRepository;
import com.fitnesstracker.repository.WorkoutRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository,
                                          MealRepository mealRepository,
                                          WorkoutRepository workoutRepository) {
        return args -> {
            if (userRepository.count() == 0) {
                // Create a Default Demo User
                User demoUser = new User("demo", "password123", "demo@example.com", 2200);
                userRepository.save(demoUser);

                LocalDate today = LocalDate.now();

                // Seed sample meals for today
                mealRepository.save(new Meal("Oatmeal with Blueberries & Honey", 350, 12.5, "Breakfast", today, demoUser));
                mealRepository.save(new Meal("Grilled Chicken Breast with Brown Rice", 580, 48.0, "Lunch", today, demoUser));
                mealRepository.save(new Meal("Greek Yogurt & Almonds", 220, 18.0, "Snack", today, demoUser));

                // Seed sample workouts for today
                workoutRepository.save(new Workout("Morning Outdoor Jog", 30, 280, "Cardio", today, demoUser));
                workoutRepository.save(new Workout("Dumbbell Upper Body Workout", 45, 210, "Strength", today, demoUser));

                System.out.println(">>> Fitness & Calorie Tracker seeded successfully! <<<");
                System.out.println(">>> Demo Account: username='demo', password='password123' <<<");
            }
        };
    }
}
