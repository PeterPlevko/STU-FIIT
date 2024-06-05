import { NavigationContainer } from '@react-navigation/native';
import Navigator from './src/parts/Navigator';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Navigator/>
      </NavigationContainer>
    </AuthProvider>
  );
}
