import React from 'react';
import { Flame, Target, LogOut, User as UserIcon } from 'lucide-react';

export default function Navbar({ user, onOpenGoalModal, onLogout }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-icon">
          <Flame size={24} />
        </div>
        <div>
          <h1 className="brand-title">FitTrack</h1>
          <span className="brand-subtitle">Fitness & Calorie Tracker</span>
        </div>
      </div>

      <div className="nav-actions">
        <div className="user-badge">
          <UserIcon size={16} className="text-emerald-400" />
          <span style={{ fontWeight: 600 }}>{user.username}</span>
        </div>

        <button 
          className="btn btn-secondary btn-sm" 
          onClick={onOpenGoalModal}
          title="Change Daily Calorie Goal"
        >
          <Target size={15} style={{ color: '#10b981' }} />
          <span>Goal: <strong>{user.dailyCalorieGoal || 2000}</strong> kcal</span>
        </button>

        <button 
          className="btn btn-danger btn-sm" 
          onClick={onLogout}
          title="Sign out"
        >
          <LogOut size={15} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
