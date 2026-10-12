package com.fitnesstracker.dto;

import java.time.LocalDate;

public class DailySummaryDto {

    private LocalDate date;
    private Integer dailyCalorieGoal;
    private Integer totalCaloriesConsumed;
    private Integer totalCaloriesBurned;
    private Integer netCalories; // totalCaloriesConsumed - totalCaloriesBurned
    private Double totalProtein;
    private Double progressPercentage;
    private Integer remainingCalories;
    private Integer mealCount;
    private Integer workoutCount;
    private String status;

    public DailySummaryDto() {
    }

    public DailySummaryDto(LocalDate date, Integer dailyCalorieGoal, Integer totalCaloriesConsumed, 
                           Integer totalCaloriesBurned, Integer netCalories, Double totalProtein, 
                           Double progressPercentage, Integer remainingCalories, 
                           Integer mealCount, Integer workoutCount, String status) {
        this.date = date;
        this.dailyCalorieGoal = dailyCalorieGoal;
        this.totalCaloriesConsumed = totalCaloriesConsumed;
        this.totalCaloriesBurned = totalCaloriesBurned;
        this.netCalories = netCalories;
        this.totalProtein = totalProtein;
        this.progressPercentage = progressPercentage;
        this.remainingCalories = remainingCalories;
        this.mealCount = mealCount;
        this.workoutCount = workoutCount;
        this.status = status;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Integer getDailyCalorieGoal() {
        return dailyCalorieGoal;
    }

    public void setDailyCalorieGoal(Integer dailyCalorieGoal) {
        this.dailyCalorieGoal = dailyCalorieGoal;
    }

    public Integer getTotalCaloriesConsumed() {
        return totalCaloriesConsumed;
    }

    public void setTotalCaloriesConsumed(Integer totalCaloriesConsumed) {
        this.totalCaloriesConsumed = totalCaloriesConsumed;
    }

    public Integer getTotalCaloriesBurned() {
        return totalCaloriesBurned;
    }

    public void setTotalCaloriesBurned(Integer totalCaloriesBurned) {
        this.totalCaloriesBurned = totalCaloriesBurned;
    }

    public Integer getNetCalories() {
        return netCalories;
    }

    public void setNetCalories(Integer netCalories) {
        this.netCalories = netCalories;
    }

    public Double getTotalProtein() {
        return totalProtein;
    }

    public void setTotalProtein(Double totalProtein) {
        this.totalProtein = totalProtein;
    }

    public Double getProgressPercentage() {
        return progressPercentage;
    }

    public void setProgressPercentage(Double progressPercentage) {
        this.progressPercentage = progressPercentage;
    }

    public Integer getRemainingCalories() {
        return remainingCalories;
    }

    public void setRemainingCalories(Integer remainingCalories) {
        this.remainingCalories = remainingCalories;
    }

    public Integer getMealCount() {
        return mealCount;
    }

    public void setMealCount(Integer mealCount) {
        this.mealCount = mealCount;
    }

    public Integer getWorkoutCount() {
        return workoutCount;
    }

    public void setWorkoutCount(Integer workoutCount) {
        this.workoutCount = workoutCount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
