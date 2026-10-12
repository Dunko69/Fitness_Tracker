import React from 'react';
import { Target, Utensils, Flame, Activity, Zap, TrendingUp, TrendingDown } from 'lucide-react';

export default function DailySummary({ summary }) {
  if (!summary) return null;

  const {
    dailyCalorieGoal = 2000,
    totalCaloriesConsumed = 0,
    totalCaloriesBurned = 0,
    netCalories = 0,
    totalProtein = 0,
    progressPercentage = 0,
    remainingCalories = 0,
    mealCount = 0,
    workoutCount = 0,
    status = 'On Track'
  } = summary;

  // Determine progress bar styling based on consumption
  let progressClass = 'progress-bar-fill';
  if (totalCaloriesConsumed > dailyCalorieGoal) {
    progressClass += ' exceeded';
  } else if (progressPercentage >= 85) {
    progressClass += ' warning';
  }

  const cappedPercentage = Math.min(progressPercentage, 100);

  return (
    <div>
      {/* 4 Primary Metric Cards */}
      <div className="summary-grid">
        <div className="metric-card goal">
          <div className="metric-header">
            <span>Daily Goal</span>
            <Target size={18} style={{ color: '#3b82f6' }} />
          </div>
          <div className="metric-value">
            {dailyCalorieGoal.toLocaleString()}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-footer">
            <span>Target intake for the day</span>
          </div>
        </div>

        <div className="metric-card consumed">
          <div className="metric-header">
            <span>Consumed</span>
            <Utensils size={18} style={{ color: '#10b981' }} />
          </div>
          <div className="metric-value">
            {totalCaloriesConsumed.toLocaleString()}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-footer">
            <span>From {mealCount} {mealCount === 1 ? 'meal' : 'meals'} logged</span>
          </div>
        </div>

        <div className="metric-card burned">
          <div className="metric-header">
            <span>Burned</span>
            <Flame size={18} style={{ color: '#f59e0b' }} />
          </div>
          <div className="metric-value">
            {totalCaloriesBurned.toLocaleString()}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-footer">
            <span>From {workoutCount} {workoutCount === 1 ? 'workout' : 'workouts'}</span>
          </div>
        </div>

        <div className="metric-card net">
          <div className="metric-header">
            <span>Net Calories</span>
            <Activity size={18} style={{ color: '#8b5cf6' }} />
          </div>
          <div className="metric-value" style={{ color: netCalories < 0 ? '#34d399' : '#f8fafc' }}>
            {netCalories > 0 ? `+${netCalories.toLocaleString()}` : netCalories.toLocaleString()}
            <span className="metric-unit">kcal</span>
          </div>
          <div className="metric-footer">
            {netCalories < 0 ? (
              <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <TrendingDown size={14} /> Active Calorie Deficit
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <TrendingUp size={14} /> (Consumed - Burned)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Visual Calorie Progress Bar */}
      <div className="progress-card">
        <div className="progress-header">
          <div className="progress-title">
            <Zap size={20} style={{ color: '#10b981' }} />
            <span>Calorie Goal Progress</span>
          </div>
          <div className="progress-stats">
            <span style={{ color: totalCaloriesConsumed > dailyCalorieGoal ? '#f43f5e' : '#10b981', fontWeight: 700 }}>
              {progressPercentage}%
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.85rem', marginLeft: '0.35rem' }}>
              ({totalCaloriesConsumed} / {dailyCalorieGoal} kcal)
            </span>
          </div>
        </div>

        <div className="progress-bar-bg">
          <div 
            className={progressClass} 
            style={{ width: `${cappedPercentage}%` }}
            role="progressbar"
            aria-valuenow={progressPercentage}
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>

        <div className="progress-indicators">
          <span>
            {remainingCalories >= 0 ? (
              <><strong>{remainingCalories.toLocaleString()} kcal</strong> remaining today</>
            ) : (
              <span style={{ color: '#fb7185' }}>
                <strong>{Math.abs(remainingCalories).toLocaleString()} kcal</strong> over daily goal
              </span>
            )}
          </span>
          <span style={{ display: 'flex', gap: '1rem' }}>
            <span>Status: <strong style={{ color: '#38bdf8' }}>{status}</strong></span>
            <span>Total Protein: <strong style={{ color: '#a78bfa' }}>{totalProtein}g</strong></span>
          </span>
        </div>
      </div>
    </div>
  );
}
