package com.fitnesstracker.controller;

import com.fitnesstracker.dto.AuthRequest;
import com.fitnesstracker.dto.AuthResponse;
import com.fitnesstracker.dto.RegisterRequest;
import com.fitnesstracker.dto.UserProfileDto;
import com.fitnesstracker.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = userService.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = userService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/profile/{userId}")
    public ResponseEntity<UserProfileDto> getProfile(@PathVariable Long userId) {
        UserProfileDto profile = userService.getProfile(userId);
        return ResponseEntity.ok(profile);
    }

    @PutMapping("/profile/{userId}/goal")
    public ResponseEntity<UserProfileDto> updateCalorieGoal(
            @PathVariable Long userId,
            @RequestBody Map<String, Integer> payload) {
        Integer newGoal = payload.get("dailyCalorieGoal");
        UserProfileDto updatedProfile = userService.updateCalorieGoal(userId, newGoal);
        return ResponseEntity.ok(updatedProfile);
    }
}
