import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const USERS_KEY = 'mm_users';
const SESSION_KEY = 'mm_session';

const ADMIN_CREDENTIALS = {
  email: 'admin@meltedmodulus.com',
  password: 'admin123',
  name: 'Admin',
  role: 'admin'
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (session) {
        setCurrentUser(session);
      }
    } catch (error) {
      console.error('Failed to parse session:', error);
    }
  }, []);

  const getUsers = () => {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      return [];
    }
  };

  const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const saveSession = (user) => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  };

  const clearSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };

  const signup = (name, email, password) => {
    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    if (!name || name.length < 2) return { success: false, error: 'Name must be at least 2 characters.' };
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: 'Please enter a valid email address.' };
    if (!password || password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

    const user = {
      id: 'user_' + Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password, // In production, this would be hashed
      role: 'user',
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);

    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    saveSession(session);
    setCurrentUser(session);

    return { success: true, user: session };
  };

  const login = (email, password) => {
    if (email.toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const session = { id: 'admin', name: ADMIN_CREDENTIALS.name, email: ADMIN_CREDENTIALS.email, role: 'admin' };
      saveSession(session);
      setCurrentUser(session);
      return { success: true, user: session };
    }

    const users = getUsers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) return { success: false, error: 'No account found with this email.' };
    if (user.password !== password) return { success: false, error: 'Incorrect password. Please try again.' };

    const session = { id: user.id, name: user.name, email: user.email, role: user.role };
    saveSession(session);
    setCurrentUser(session);

    return { success: true, user: session };
  };

  const logout = () => {
    clearSession();
    setCurrentUser(null);
  };

  const isLoggedIn = !!currentUser;
  const isAdmin = currentUser && currentUser.role === 'admin';

  return (
    <AuthContext.Provider value={{ currentUser, login, signup, logout, isLoggedIn, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
