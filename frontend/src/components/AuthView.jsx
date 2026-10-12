import React, { useState } from 'react';
import { Flame, LogIn, UserPlus, Sparkles, CheckCircle } from 'lucide-react';

export default function AuthView({ onLoginSuccess }) {
  const [tab, setTab] = useState('login'); // 'login' | 'signup'

  // Login form state
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regGoal, setRegGoal] = useState('2000');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const fillDemoAccount = () => {
    setTab('login');
    setLoginUsername('demo');
    setLoginPassword('password123');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginUsername.trim() || !loginPassword.trim()) {
      setError('Please provide both username and password');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const res = await onLoginSuccess('login', {
        username: loginUsername.trim(),
        password: loginPassword
      });
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (regUsername.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    if (!regEmail.includes('@') || !regEmail.includes('.')) {
      setError('Please enter a valid email address');
      return;
    }
    if (regPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (!regGoal || Number(regGoal) < 500) {
      setError('Calorie goal must be at least 500 kcal');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await onLoginSuccess('register', {
        username: regUsername.trim(),
        email: regEmail.trim(),
        password: regPassword,
        dailyCalorieGoal: parseInt(regGoal, 10)
      });
      setSuccessMsg('Account registered successfully! Logging you in...');
    } catch (err) {
      setError(err.message || 'Registration failed. Username or email may already be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div className="brand-icon" style={{ margin: '0 auto 1rem auto', width: '52px', height: '52px' }}>
            <Flame size={30} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.025em' }}>FitTrack</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Computer Science Semester Project
          </p>
        </div>

        {/* Demo Account Quick-Fill Card */}
        <div 
          onClick={fillDemoAccount}
          style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px dashed #10b981',
            borderRadius: '10px',
            padding: '0.75rem 1rem',
            marginBottom: '1.25rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'background 0.2s'
          }}
          title="Click to auto-fill demo credentials"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Sparkles size={18} style={{ color: '#10b981' }} />
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>Quick Demo Account</div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>User: <strong>demo</strong> / Pass: <strong>password123</strong></div>
            </div>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>Use &rarr;</span>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${tab === 'login' ? 'active' : ''}`}
            onClick={() => { setTab('login'); setError(''); }}
          >
            Sign In
          </button>
          <button
            className={`auth-tab ${tab === 'signup' ? 'active' : ''}`}
            onClick={() => { setTab('signup'); setError(''); }}
          >
            Create Account
          </button>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="alert alert-success">
            <CheckCircle size={16} />
            {successMsg}
          </div>
        )}

        {tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <div className="form-group" style={{ marginBottom: '1rem' }}>
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter username"
                value={loginUsername}
                onChange={(e) => setLoginUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
              disabled={loading}
            >
              <LogIn size={16} />
              <span>{loading ? 'Signing In...' : 'Sign In'}</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <div className="form-group" style={{ marginBottom: '0.85rem' }}>
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Choose a username"
                value={regUsername}
                onChange={(e) => setRegUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '0.85rem' }}>
              <label>Email Address</label>
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '0.85rem' }}>
              <label>Password (min 6 chars)</label>
              <input
                type="password"
                className="form-control"
                placeholder="Create password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.5rem' }}>
              <label>Daily Calorie Target (kcal)</label>
              <input
                type="number"
                min="500"
                step="50"
                className="form-control"
                value={regGoal}
                onChange={(e) => setRegGoal(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.75rem' }}
              disabled={loading}
            >
              <UserPlus size={16} />
              <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
