import React, { useState } from 'react';
import { Dumbbell, Plus, Edit2, Trash2, X, Check, Flame } from 'lucide-react';

export default function WorkoutTracker({ workouts, currentDate, onAddWorkout, onUpdateWorkout, onDeleteWorkout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [exerciseName, setExerciseName] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [category, setCategory] = useState('Cardio');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setExerciseName('');
    setDurationMinutes('');
    setCaloriesBurned('');
    setCategory('Cardio');
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
  };

  const handleStartEdit = (workout) => {
    setIsEditing(true);
    setEditingId(workout.id);
    setExerciseName(workout.exerciseName);
    setDurationMinutes(workout.durationMinutes.toString());
    setCaloriesBurned(workout.caloriesBurned.toString());
    setCategory(workout.category || 'Cardio');
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!exerciseName.trim()) {
      setFormError('Please enter an exercise name');
      return;
    }
    if (!durationMinutes || Number(durationMinutes) <= 0) {
      setFormError('Duration must be at least 1 minute');
      return;
    }
    if (caloriesBurned === '' || Number(caloriesBurned) < 0) {
      setFormError('Calories burned cannot be negative');
      return;
    }

    const workoutData = {
      exerciseName: exerciseName.trim(),
      durationMinutes: parseInt(durationMinutes, 10),
      caloriesBurned: parseInt(caloriesBurned, 10),
      category,
      date: currentDate
    };

    try {
      if (isEditing) {
        await onUpdateWorkout(editingId, workoutData);
      } else {
        await onAddWorkout(workoutData);
      }
      resetForm();
    } catch (err) {
      setFormError(err.message || 'Failed to save workout');
    }
  };

  const getCategoryBadgeClass = (cat) => {
    const lower = (cat || '').toLowerCase();
    if (lower === 'cardio') return 'badge badge-cardio';
    if (lower === 'strength') return 'badge badge-strength';
    if (lower === 'hiit') return 'badge badge-hiit';
    if (lower === 'yoga') return 'badge badge-yoga';
    return 'badge badge-lunch';
  };

  return (
    <div className="tracker-panel">
      <div className="tracker-header">
        <div className="tracker-title">
          <Dumbbell size={20} style={{ color: '#f59e0b' }} />
          <span>Workouts Logged</span>
        </div>
        <span className="badge badge-cardio">
          {workouts.length} {workouts.length === 1 ? 'Session' : 'Sessions'}
        </span>
      </div>

      {/* Workout Entry Form */}
      <form onSubmit={handleSubmit} className="form-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
            {isEditing ? 'Edit Workout' : 'Add New Workout'}
          </span>
          {isEditing && (
            <button type="button" onClick={resetForm} className="btn-icon" title="Cancel edit">
              <X size={16} />
            </button>
          )}
        </div>

        {formError && (
          <div className="alert alert-error" style={{ padding: '0.4rem 0.6rem', fontSize: '0.75rem' }}>
            {formError}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group" style={{ gridColumn: 'span 2' }}>
            <label>Exercise Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. 5K Running or Bench Press"
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="HIIT">HIIT</option>
              <option value="Sports">Sports</option>
              <option value="Yoga">Yoga / Stretch</option>
            </select>
          </div>

          <div className="form-group">
            <label>Duration (mins)</label>
            <input
              type="number"
              min="1"
              className="form-control"
              placeholder="e.g. 30"
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Calories Burned</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="e.g. 250"
              value={caloriesBurned}
              onChange={(e) => setCaloriesBurned(e.target.value)}
              required
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
          {isEditing && (
            <button type="button" className="btn btn-secondary btn-sm" onClick={resetForm}>
              Cancel
            </button>
          )}
          <button type="submit" className="btn btn-primary btn-sm" style={{ background: '#f59e0b', color: '#0b0f19' }}>
            {isEditing ? <Check size={14} /> : <Plus size={14} />}
            <span>{isEditing ? 'Save Workout' : 'Log Workout'}</span>
          </button>
        </div>
      </form>

      {/* Workouts List */}
      <div className="items-list">
        {workouts.length === 0 ? (
          <div className="empty-state">
            <Flame className="empty-icon" />
            <p>No workouts recorded for this date yet.</p>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Log running, lifting, walking, or sports sessions above!</span>
          </div>
        ) : (
          workouts.map((workout) => (
            <div key={workout.id} className="item-row">
              <div className="item-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="item-name">{workout.exerciseName}</span>
                  <span className={getCategoryBadgeClass(workout.category)}>{workout.category}</span>
                </div>
                <div className="item-meta">
                  <span style={{ color: '#f59e0b', fontWeight: 600 }}>{workout.caloriesBurned} kcal burned</span>
                  <span>•</span>
                  <span>{workout.durationMinutes} mins</span>
                </div>
              </div>

              <div className="item-actions">
                <button
                  className="btn-icon"
                  title="Edit workout"
                  onClick={() => handleStartEdit(workout)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="btn-icon delete"
                  title="Delete workout"
                  onClick={() => {
                    if (window.confirm(`Delete "${workout.exerciseName}"?`)) {
                      onDeleteWorkout(workout.id);
                    }
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
