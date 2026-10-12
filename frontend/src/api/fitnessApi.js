/**
 * Fitness Tracker API Client
 * Connects to the Spring Boot REST backend
 */
// Use /api to leverage Vite's dev server proxy, with fallback to direct backend url
const API_BASE_URL = typeof window !== 'undefined' && window.location.port === '3000'
  ? '/api'
  : 'http://localhost:8080/api';

async function safeFetch(url, options = {}) {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.fieldErrors) {
          errorMessage = Object.values(errorData.fieldErrors).join(', ');
        }
      } catch {
        if (response.status === 500 || response.status === 502 || response.status === 504) {
          errorMessage = 'Cannot connect to backend on port 8080 (Connection Refused). Please make sure the Spring Boot backend is running.';
        }
      }
      throw new Error(errorMessage);
    }
    return response.json();
  } catch (err) {
    if (err.message && (err.message.includes('Failed to fetch') || err.message.includes('NetworkError'))) {
      throw new Error(
        'Backend server is not reachable on port 8080. Please make sure the Spring Boot backend is running (mvn spring-boot:run in the backend folder).'
      );
    }
    throw err;
  }
}

export const fitnessApi = {
  // Authentication & Profile Endpoints
  async login(username, password) {
    return safeFetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  },

  async register(username, password, email, dailyCalorieGoal) {
    return safeFetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email, dailyCalorieGoal: Number(dailyCalorieGoal) }),
    });
  },

  async getProfile(userId) {
    return safeFetch(`${API_BASE_URL}/auth/profile/${userId}`);
  },

  async updateCalorieGoal(userId, dailyCalorieGoal) {
    return safeFetch(`${API_BASE_URL}/auth/profile/${userId}/goal`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dailyCalorieGoal: Number(dailyCalorieGoal) }),
    });
  },

  // Meal Tracking Endpoints
  async getMeals(userId, date = null) {
    const url = date
      ? `${API_BASE_URL}/meals/user/${userId}?date=${date}`
      : `${API_BASE_URL}/meals/user/${userId}`;
    return safeFetch(url);
  },

  async addMeal(mealData) {
    return safeFetch(`${API_BASE_URL}/meals`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mealData),
    });
  },

  async updateMeal(id, mealData) {
    return safeFetch(`${API_BASE_URL}/meals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mealData),
    });
  },

  async deleteMeal(id) {
    return safeFetch(`${API_BASE_URL}/meals/${id}`, {
      method: 'DELETE',
    });
  },

  // Workout Tracking Endpoints
  async getWorkouts(userId, date = null) {
    const url = date
      ? `${API_BASE_URL}/workouts/user/${userId}?date=${date}`
      : `${API_BASE_URL}/workouts/user/${userId}`;
    return safeFetch(url);
  },

  async addWorkout(workoutData) {
    return safeFetch(`${API_BASE_URL}/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData),
    });
  },

  async updateWorkout(id, workoutData) {
    return safeFetch(`${API_BASE_URL}/workouts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(workoutData),
    });
  },

  async deleteWorkout(id) {
    return safeFetch(`${API_BASE_URL}/workouts/${id}`, {
      method: 'DELETE',
    });
  },

  // Daily Summary & Progress Metrics
  async getDailySummary(userId, date) {
    const url = date
      ? `${API_BASE_URL}/summary/user/${userId}?date=${date}`
      : `${API_BASE_URL}/summary/user/${userId}`;
    return safeFetch(url);
  }
};
