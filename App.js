import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import ScreenRegisterGlicemia from './pages/registro/RegistroGlicemiaScreen';
import Configuration from './pages/configuracao/Configuracao';
import DashboardScreen from './pages/dashboard/Dashboard';
import RelatoriosScreen from './pages/relatorios/ReportScreen';
import ReportViewScreen from './pages/relatorios/ReportView';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FF9999', // cabeçalho
          },
          headerTintColor: '#000', 
          headerTitleStyle: {
            fontWeight: 'bold', 
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Login' }}
        />

        <Stack.Screen
          name="Glicemia"
          component={ScreenRegisterGlicemia}
          options={{title: 'Registrar Glicemia'}}
        />

        <Stack.Screen
          name="Configuração"
          component={Configuration}
          options={{ title: 'Configuração' }}
        />

        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: 'Meu Dashboard' }}
        />

        <Stack.Screen
          name="Relatorios"
          component={RelatoriosScreen}
          options={{ title: 'Relatórios' }}
        />

        <Stack.Screen
          name="ReportView"
          component={ReportViewScreen}
          options={{ title: 'Resultado:' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
