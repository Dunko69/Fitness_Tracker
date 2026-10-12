import React from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

export default function DateNavigator({ currentDate, onDateChange }) {
  const todayStr = new Date().toISOString().split('T')[0];

  const handlePrevDay = () => {
    const d = new Date(currentDate + 'T00:00:00');
    d.setDate(d.getDate() - 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(currentDate + 'T00:00:00');
    d.setDate(d.getDate() + 1);
    onDateChange(d.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    onDateChange(todayStr);
  };

  const formatDisplayDate = (dateStr) => {
    const d = new Date(dateStr + 'T00:00:00');
    const isToday = dateStr === todayStr;
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    const formatted = d.toLocaleDateString('en-US', options);
    return isToday ? `Today (${formatted})` : formatted;
  };

  return (
    <div className="date-bar">
      <div className="date-controls">
        <button className="date-btn" onClick={handlePrevDay} title="Previous Day">
          <ChevronLeft size={16} />
        </button>

        <span className="date-display">{formatDisplayDate(currentDate)}</span>

        <button className="date-btn" onClick={handleNextDay} title="Next Day">
          <ChevronRight size={16} />
        </button>

        {currentDate !== todayStr && (
          <button className="date-btn" onClick={handleToday} style={{ marginLeft: '0.5rem', color: '#10b981' }}>
            Jump to Today
          </button>
        )}
      </div>

      <div className="date-input-wrapper">
        <label htmlFor="date-picker" style={{ display: 'none' }}>Select Date</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={16} style={{ color: '#94a3b8' }} />
          <input
            id="date-picker"
            type="date"
            value={currentDate}
            onChange={(e) => e.target.value && onDateChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
