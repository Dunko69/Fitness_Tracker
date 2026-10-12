import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import DateNavigator from './components/DateNavigator';
import DailySummary from './components/DailySummary';
import MealTracker from './components/MealTracker';
import WorkoutTracker from './components/WorkoutTracker';
import GoalModal from './components/GoalModal';
import AuthView from './components/AuthView';
import { fitnessApi } from './api/fitnessApi';

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('fitness_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [currentDate, setCurrentDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const [summary, setSummary] = useState(null);
  const [meals, setMeals] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [bannerMsg, setBannerMsg] = useState('');

  const showBanner = (msg) => {
    setBannerMsg(msg);
    setTimeout(() => setBannerMsg(''), 3500);
  };

  // Load daily data (summary, meals, workouts) for current user & date
  const loadDailyData = useCallback(async () => {
    if (!user || !user.id) return;

    try {
      setLoading(true);
      const [summaryData, mealsData, workoutsData] = await Promise.all([
        fitnessApi.getDailySummary(user.id, currentDate),
        fitnessApi.getMeals(user.id, currentDate),
        fitnessApi.getWorkouts(user.id, currentDate)
      ]);

      setSummary(summaryData);
      setMeals(mealsData);
      setWorkouts(workoutsData);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  }, [user, currentDate]);

  useEffect(() => {
    if (user && user.id) {
      loadDailyData();
    }
  }, [user, currentDate, loadDailyData]);

  // Auth Handlers
  const handleAuth = async (type, payload) => {
    let authUser;
    if (type === 'login') {
      authUser = await fitnessApi.login(payload.username, payload.password);
    } else {
      authUser = await fitnessApi.register(
        payload.username,
        payload.password,
        payload.email,
        payload.dailyCalorieGoal
      );
    }

    const userData = {
      id: authUser.id,
      username: authUser.username,
      email: authUser.email,
      dailyCalorieGoal: authUser.dailyCalorieGoal
    };

    localStorage.setItem('fitness_user', JSON.stringify(userData));
    setUser(userData);
    showBanner(`Welcome back, ${userData.username}!`);
    return userData;
  };

  const handleLogout = () => {
    localStorage.removeItem('fitness_user');
    setUser(null);
    setSummary(null);
    setMeals([]);
    setWorkouts([]);
  };

  // Calorie Goal Handler
  const handleSaveGoal = async (newGoal) => {
    const updated = await fitnessApi.updateCalorieGoal(user.id, newGoal);
    const updatedUser = { ...user, dailyCalorieGoal: updated.dailyCalorieGoal };
    localStorage.setItem('fitness_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    showBanner(`Daily goal updated to ${newGoal.toLocaleString()} kcal!`);
    loadDailyData();
  };

  // Meal Handlers
  const handleAddMeal = async (mealData) => {
    await fitnessApi.addMeal({ ...mealData, userId: user.id });
    showBanner(`Logged meal: ${mealData.foodName}`);
    loadDailyData();
  };

  const handleUpdateMeal = async (id, mealData) => {
    await fitnessApi.updateMeal(id, { ...mealData, userId: user.id });
    showBanner(`Updated meal: ${mealData.foodName}`);
    loadDailyData();
  };

  const handleDeleteMeal = async (id) => {
    await fitnessApi.deleteMeal(id);
    showBanner('Meal deleted successfully');
    loadDailyData();
  };

  // Workout Handlers
  const handleAddWorkout = async (workoutData) => {
    await fitnessApi.addWorkout({ ...workoutData, userId: user.id });
    showBanner(`Logged workout: ${workoutData.exerciseName}`);
    loadDailyData();
  };

  const handleUpdateWorkout = async (id, workoutData) => {
    await fitnessApi.updateWorkout(id, { ...workoutData, userId: user.id });
    showBanner(`Updated workout: ${workoutData.exerciseName}`);
    loadDailyData();
  };

  const handleDeleteWorkout = async (id) => {
    await fitnessApi.deleteWorkout(id);
    showBanner('Workout deleted successfully');
    loadDailyData();
  };

  if (!user) {
    return <AuthView onLoginSuccess={handleAuth} />;
  }

  return (
    <div className="app-container">
      <Navbar
        user={user}
        onOpenGoalModal={() => setIsGoalModalOpen(true)}
        onLogout={handleLogout}
      />

      {bannerMsg && (
        <div className="alert alert-success" style={{ marginBottom: '1.5rem', animation: 'fadeIn 0.3s' }}>
          {bannerMsg}
        </div>
      )}

      {/* Date Navigation Bar */}
      <DateNavigator
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      {/* Dashboard Metrics & Calorie Progress Bar */}
      <DailySummary summary={summary} />

      {/* Trackers Grid: Meals & Workouts */}
      <div className="trackers-grid">
        <MealTracker
          meals={meals}
          currentDate={currentDate}
          onAddMeal={handleAddMeal}
          onUpdateMeal={handleUpdateMeal}
          onDeleteMeal={handleDeleteMeal}
        />

        <WorkoutTracker
          workouts={workouts}
          currentDate={currentDate}
          onAddWorkout={handleAddWorkout}
          onUpdateWorkout={handleUpdateWorkout}
          onDeleteWorkout={handleDeleteWorkout}
        />
      </div>

      {/* Update Daily Calorie Goal Modal */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => setIsGoalModalOpen(false)}
        currentGoal={user.dailyCalorieGoal}
        onSaveGoal={handleSaveGoal}
      />
    </div>
  );
}
