package com.fitnesstracker.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class MealDto {

    private Long id;

    @NotBlank(message = "Food name is required")
    private String foodName;

    @NotNull(message = "Calories are required")
    @Min(value = 0, message = "Calories cannot be negative")
    private Integer calories;

    @NotNull(message = "Protein amount is required")
    @Min(value = 0, message = "Protein cannot be negative")
    private Double protein;

    private String mealType = "Lunch";

    @NotNull(message = "Date is required")
    private LocalDate date;

    private Long userId;

    public MealDto() {
    }

    public MealDto(Long id, String foodName, Integer calories, Double protein, String mealType, LocalDate date, Long userId) {
        this.id = id;
        this.foodName = foodName;
        this.calories = calories;
        this.protein = protein;
        this.mealType = mealType;
        this.date = date;
        this.userId = userId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFoodName() {
        return foodName;
    }

    public void setFoodName(String foodName) {
        this.foodName = foodName;
    }

    public Integer getCalories() {
        return calories;
    }

    public void setCalories(Integer calories) {
        this.calories = calories;
    }

    public Double getProtein() {
        return protein;
    }

    public void setProtein(Double protein) {
        this.protein = protein;
    }

    public String getMealType() {
        return mealType;
    }

    public void setMealType(String mealType) {
        this.mealType = mealType;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
