package com.fitnesstracker.service;

import com.fitnesstracker.dto.AuthRequest;
import com.fitnesstracker.dto.AuthResponse;
import com.fitnesstracker.dto.RegisterRequest;
import com.fitnesstracker.dto.UserProfileDto;
import com.fitnesstracker.model.User;
import com.fitnesstracker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            throw new IllegalArgumentException("Username '" + request.getUsername() + "' is already taken.");
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email '" + request.getEmail() + "' is already registered.");
        }

        User user = new User(
                request.getUsername().trim(),
                request.getPassword(), // Standard simple password validation for semester project
                request.getEmail().trim(),
                request.getDailyCalorieGoal() != null ? request.getDailyCalorieGoal() : 2000
        );

        User savedUser = userRepository.save(user);
        return new AuthResponse(
                savedUser.getId(),
                savedUser.getUsername(),
                savedUser.getEmail(),
                savedUser.getDailyCalorieGoal(),
                "User registered successfully!"
        );
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername().trim())
                .orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));

        if (!user.getPassword().equals(request.getPassword())) {
            throw new IllegalArgumentException("Invalid username or password.");
        }

        return new AuthResponse(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getDailyCalorieGoal(),
                "Login successful!"
        );
    }

    public UserProfileDto getProfile(Long userId) {
        User user = getUserEntity(userId);
        return new UserProfileDto(user.getId(), user.getUsername(), user.getEmail(), user.getDailyCalorieGoal());
    }

    public UserProfileDto updateCalorieGoal(Long userId, Integer newGoal) {
        if (newGoal == null || newGoal < 500) {
            throw new IllegalArgumentException("Daily calorie goal must be at least 500 kcal.");
        }
        User user = getUserEntity(userId);
        user.setDailyCalorieGoal(newGoal);
        User updated = userRepository.save(user);
        return new UserProfileDto(updated.getId(), updated.getUsername(), updated.getEmail(), updated.getDailyCalorieGoal());
    }

    public User getUserEntity(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with id: " + userId));
    }
}
