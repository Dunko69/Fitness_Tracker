package com.fitnesstracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class UserProfileDto {

    private Long id;
    private String username;
    private String email;

    @NotNull(message = "Daily calorie goal is required")
    @Min(value = 500, message = "Daily calorie goal must be at least 500 kcal")
    private Integer dailyCalorieGoal;

    public UserProfileDto() {
    }

    public UserProfileDto(Long id, String username, String email, Integer dailyCalorieGoal) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.dailyCalorieGoal = dailyCalorieGoal;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getDailyCalorieGoal() {
        return dailyCalorieGoal;
    }

    public void setDailyCalorieGoal(Integer dailyCalorieGoal) {
        this.dailyCalorieGoal = dailyCalorieGoal;
    }
}
