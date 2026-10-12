import React, { useState } from 'react';
import { Target, X, Check } from 'lucide-react';

export default function GoalModal({ isOpen, onClose, currentGoal, onSaveGoal }) {
  const [goal, setGoal] = useState(currentGoal || 2000);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!goal || Number(goal) < 500) {
      setError('Daily calorie goal must be at least 500 kcal');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await onSaveGoal(parseInt(goal, 10));
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update calorie goal');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.5rem', borderRadius: '8px' }}>
              <Target size={22} style={{ color: '#10b981' }} />
            </div>
            <div>
              <h2 className="modal-title">Set Daily Calorie Goal</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Personalize your daily nutrition target</p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label>Target Daily Calories (kcal)</label>
            <input
              type="number"
              min="500"
              max="15000"
              step="50"
              className="form-control"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              required
              autoFocus
            />
            <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.35rem' }}>
              Recommended: 1,800 - 2,500 kcal for general fitness maintenance.
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              <Check size={16} />
              <span>{isSubmitting ? 'Saving...' : 'Update Goal'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
