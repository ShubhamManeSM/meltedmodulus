import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

export const AuthModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  
  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirm, setSignupConfirm] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Focus email input after transition
      setTimeout(() => {
        if (emailInputRef.current) emailInputRef.current.focus();
      }, 300);
    } else {
      document.body.style.overflow = '';
      // Reset form state on close
      setError('');
      setLoginEmail('');
      setLoginPassword('');
      setSignupName('');
      setSignupEmail('');
      setSignupPassword('');
      setSignupConfirm('');
      setActiveTab('login');
    }
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const switchTab = (tab) => {
    setError('');
    setActiveTab(tab);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const result = login(loginEmail, loginPassword);
      if (result.success) {
        onClose();
        if (result.user.role === 'admin') {
          navigate('/admin');
        }
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    if (signupPassword !== signupConfirm) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = signup(signupName, signupEmail, signupPassword);
      if (result.success) {
        onClose();
      } else {
        setError(result.error);
      }
      setIsLoading(false);
    }, 800);
  };

  const handleForgotOrSocial = (msg) => {
    setError(msg);
  };

  if (!isOpen && !document.getElementById('auth-overlay')?.classList.contains('open')) {
     // We use CSS transition for hiding, but we completely unmount if not open to keep DOM clean.
     // Let's just render with classes.
  }

  return (
    <div className={`auth-overlay ${isOpen ? 'open' : ''}`} id="auth-overlay" onClick={(e) => { if (e.target.id === 'auth-overlay') onClose(); }}>
      <div className="auth-modal">
        <button className="auth-modal__close" onClick={onClose} aria-label="Close">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" width="18" height="18">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
        
        <div className="auth-modal__body">
          <div className="auth-modal__logo">
            <img src={logo} alt="MeltedModulus" />
            <h2><span className="text-gradient">Welcome</span></h2>
            <p>Sign in to your account or create a new one</p>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`} onClick={() => switchTab('login')}>Sign In</button>
            <button className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => switchTab('signup')}>Sign Up</button>
          </div>

          <div className={`auth-error ${error ? 'show' : ''}`} id="auth-error">{error}</div>

          {/* LOGIN PANEL */}
          <div className={`auth-panel ${activeTab === 'login' ? 'active' : ''}`}>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-email">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  id="login-email" 
                  placeholder="your@email.com" 
                  required 
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  ref={emailInputRef}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <div className="password-wrapper">
                  <input 
                    type={showLoginPassword ? 'text' : 'password'} 
                    className="form-input" 
                    id="login-password" 
                    placeholder="Enter your password" 
                    required 
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowLoginPassword(!showLoginPassword)} aria-label="Toggle password">
                    {showLoginPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="auth-options">
                <label className="auth-remember"><input type="checkbox" defaultChecked /> Remember me</label>
                <button type="button" className="auth-forgot" onClick={() => handleForgotOrSocial('Password reset is not yet available. Please contact support.')}>Forgot password?</button>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <div className="auth-divider">or continue with</div>
            <div className="auth-social">
              <button className="auth-social-btn" type="button" onClick={() => handleForgotOrSocial('Google sign-in will be available after backend integration. For now, create an account with email.')}>
                <svg viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </button>
            </div>
            <div className="auth-footer">
              <p>Don't have an account? <button onClick={() => switchTab('signup')}>Sign up</button></p>
            </div>
          </div>

          {/* SIGNUP PANEL */}
          <div className={`auth-panel ${activeTab === 'signup' ? 'active' : ''}`}>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-name">Full Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  id="signup-name" 
                  placeholder="Your full name" 
                  required 
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-email">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  id="signup-email" 
                  placeholder="your@email.com" 
                  required 
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-password">Password</label>
                <div className="password-wrapper">
                  <input 
                    type={showSignupPassword ? 'text' : 'password'} 
                    className="form-input" 
                    id="signup-password" 
                    placeholder="Min. 6 characters" 
                    required minLength="6"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowSignupPassword(!showSignupPassword)} aria-label="Toggle password">
                    {showSignupPassword ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="signup-confirm">Confirm Password</label>
                <div className="password-wrapper">
                  <input 
                    type={showSignupConfirm ? 'text' : 'password'} 
                    className="form-input" 
                    id="signup-confirm" 
                    placeholder="Re-enter password" 
                    required
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowSignupConfirm(!showSignupConfirm)} aria-label="Toggle password">
                    {showSignupConfirm ? '🙈' : '👁️'}
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: 'var(--space-4)' }} disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </form>
            <div className="auth-footer" style={{ marginTop: 'var(--space-4)' }}>
              <p>Already have an account? <button onClick={() => switchTab('login')}>Sign in</button></p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
