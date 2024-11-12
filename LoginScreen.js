import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import styles from './Styles';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  
  const storeUserId = async (userId) => {
    try {
      await AsyncStorage.setItem('id', userId.toString());
    } catch (error) {
      console.error('Erro ao salvar o ID do usuário', error);
    }
  };

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      // API Teste. Substituir pela API-Andrews
      const response = await fetch('http://127.0.0.1:8080/usuario/logar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();
      console.log(data);
      console.log(data.id);

      if (response != null) {
        Alert.alert("Login deu certo")

        storeUserId(data.id)

        navigation.replace('Dashboard')
      } else {
        Alert.alert('Erro', data.message || 'Erro no login. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro durante o login:', error);
      Alert.alert('Erro', 'Erro no login. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://agecon.unl.edu/images/icons/natres-icon.png' }} style={styles.logo} />
      <Text style={styles.titulo}>Bem-Vindo(a) ao App Glicemia</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={setEmail}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        onChangeText={setSenha}
        value={senha}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Entrar" onPress={handleLogin} />
      )}
    </View>
  );
};

export default LoginScreen;
