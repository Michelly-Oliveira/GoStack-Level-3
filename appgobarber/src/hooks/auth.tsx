import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

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
  loading: boolean;
}

// Context initialize with an empty object, and force the object to have AuthContext format
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  // Wait until the verufucation on AsyncStorage is done to show the correct route
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      // Get itens from local storage
      // Returns an array with arrays for each item, [key, value]
      const [token, user] = await AsyncStorage.multiGet([
        '@GoBarber:token',
        '@GoBarber:user',
      ]);

      if (token[1] && user[1]) {
        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStorageData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    // Store logged user using localStorage to keep him logged
    const { token, user } = response.data;

    await AsyncStorage.multiSet([
      ['@GoBarber:token', token],
      ['@GoBarber:user', JSON.stringify(user)],
    ]);

    // Update state with logged user
    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    // Clear local storage
    await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

    // Clear state
    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
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
