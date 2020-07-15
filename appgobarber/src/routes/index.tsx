import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  // Get user information to check if it's logged or not
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#999" />
      </View>
    );
  }
  // If the user is logged, show the routes that need the user logged(Dashboard), if it's not logged show the routes that make the login(SignIn, SignUp)
  // Return a specific route system depending if the user is logged or not
  return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
