import React, { useState } from 'react';
import { Utensils, Plus, Edit2, Trash2, X, Check, Coffee } from 'lucide-react';

export default function MealTracker({ meals, currentDate, onAddMeal, onUpdateMeal, onDeleteMeal }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [mealType, setMealType] = useState('Lunch');
  const [formError, setFormError] = useState('');

  const resetForm = () => {
    setFoodName('');
    setCalories('');
    setProtein('');
    setMealType('Lunch');
    setIsEditing(false);
    setEditingId(null);
    setFormError('');
  };

  const handleStartEdit = (meal) => {
    setIsEditing(true);
    setEditingId(meal.id);
    setFoodName(meal.foodName);
    setCalories(meal.calories.toString());
    setProtein(meal.protein.toString());
    setMealType(meal.mealType || 'Lunch');
    setFormError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foodName.trim()) {
      setFormError('Please enter a food name');
      return;
    }
    if (!calories || Number(calories) < 0) {
      setFormError('Please enter a valid calorie amount');
      return;
    }
    if (protein === '' || Number(protein) < 0) {
      setFormError('Please enter a valid protein amount in grams');
      return;
    }

    const mealData = {
      foodName: foodName.trim(),
      calories: parseInt(calories, 10),
      protein: parseFloat(protein),
      mealType,
      date: currentDate
    };

    try {
      if (isEditing) {
        await onUpdateMeal(editingId, mealData);
      } else {
        await onAddMeal(mealData);
      }
      resetForm();
    } catch (err) {
      setFormError(err.message || 'Failed to save meal');
    }
  };

  const getBadgeClass = (type) => {
    const lower = (type || '').toLowerCase();
    if (lower === 'breakfast') return 'badge badge-breakfast';
    if (lower === 'lunch') return 'badge badge-lunch';
    if (lower === 'dinner') return 'badge badge-dinner';
    return 'badge badge-snack';
  };

  return (
    <div className="tracker-panel">
      <div className="tracker-header">
        <div className="tracker-title">
          <Utensils size={20} style={{ color: '#10b981' }} />
          <span>Meals Logged</span>
        </div>
        <span className="badge badge-snack">
          {meals.length} {meals.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      {/* Meal Entry Form */}
      <form onSubmit={handleSubmit} className="form-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#f8fafc' }}>
            {isEditing ? 'Edit Meal' : 'Add New Meal'}
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
            <label>Food Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="e.g. Oatmeal with Bananas"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Type</label>
            <select
              className="form-control"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snack">Snack</option>
            </select>
          </div>

          <div className="form-group">
            <label>Calories (kcal)</label>
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="e.g. 350"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Protein (g)</label>
            <input
              type="number"
              min="0"
              step="0.1"
              className="form-control"
              placeholder="e.g. 24.5"
              value={protein}
              onChange={(e) => setProtein(e.target.value)}
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
          <button type="submit" className="btn btn-primary btn-sm">
            {isEditing ? <Check size={14} /> : <Plus size={14} />}
            <span>{isEditing ? 'Save Changes' : 'Log Meal'}</span>
          </button>
        </div>
      </form>

      {/* Meals List */}
      <div className="items-list">
        {meals.length === 0 ? (
          <div className="empty-state">
            <Coffee className="empty-icon" />
            <p>No meals recorded for this date yet.</p>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Use the form above to log your breakfast, lunch, or snacks!</span>
          </div>
        ) : (
          meals.map((meal) => (
            <div key={meal.id} className="item-row">
              <div className="item-info">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="item-name">{meal.foodName}</span>
                  <span className={getBadgeClass(meal.mealType)}>{meal.mealType}</span>
                </div>
                <div className="item-meta">
                  <span style={{ color: '#10b981', fontWeight: 600 }}>{meal.calories} kcal</span>
                  <span>•</span>
                  <span style={{ color: '#a78bfa' }}>{meal.protein}g protein</span>
                </div>
              </div>

              <div className="item-actions">
                <button
                  className="btn-icon"
                  title="Edit meal"
                  onClick={() => handleStartEdit(meal)}
                >
                  <Edit2 size={16} />
                </button>
                <button
                  className="btn-icon delete"
                  title="Delete meal"
                  onClick={() => {
                    if (window.confirm(`Delete "${meal.foodName}"?`)) {
                      onDeleteMeal(meal.id);
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
