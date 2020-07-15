import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: object;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

// Context initialize with an empty object, and force the object to have AuthContext format
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    // Get itens from local storage
    const token = localStorage.getItem('@GoBarber:token');
    const user = localStorage.getItem('@GoBarber:user');

    // If the user is already logged, its data is already on local storage, save it on state
    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    // Otherwise, user is not logged, initialize the state as an empty object
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    // Store logged user using localStorage to keep him logged
    const { token, user } = response.data;

    localStorage.setItem('@GoBarber:token', token);
    localStorage.setItem('@GoBarber:user', JSON.stringify(user));

    // Update state with logged user
    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    // Clear local storage
    localStorage.removeItem('@GoBarber:token');
    localStorage.removeItem('@GoBarber:user');

    // Clear state
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to get the token and user authenticated
export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  // If the context provider is not being used
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
