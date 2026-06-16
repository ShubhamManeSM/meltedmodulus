import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

export const AdminLoginGate = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const result = login(email, password);
      if (result.success && result.user.role === 'admin') {
        // Successful login is handled by context state change
      } else {
        setError(result.success ? 'This account does not have admin access.' : result.error);
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="admin-login-gate" style={{ display: 'flex' }}>
      <div className="admin-login-box">
        <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>🔐</div>
        <h2>Admin <span className="text-gradient">Login</span></h2>
        <p style={{ color: 'var(--clr-text-muted)' }}>Enter your admin credentials to access the dashboard.</p>
        
        <div className={`auth-error ${error ? 'show' : ''}`} style={error ? { display: 'block' } : {}}>{error}</div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">Email</label>
            <input 
              type="email" 
              className="form-input" 
              id="admin-email" 
              placeholder="admin@meltedmodulus.com" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? 'text' : 'password'} 
                className="form-input" 
                id="admin-password" 
                placeholder="Enter admin password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>
        <div style={{ marginTop: 'var(--space-6)' }}>
          <p style={{ fontSize: 'var(--fs-xs)', color: 'var(--clr-text-muted)' }}>Demo credentials: admin@meltedmodulus.com / admin123</p>
        </div>
        <Link to="/" className="btn btn-ghost btn-sm" style={{ marginTop: 'var(--space-4)' }}>← Back to Store</Link>
      </div>
    </div>
  );
};
