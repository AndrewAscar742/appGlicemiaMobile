import React, { useState } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, Alert, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './RegistroGlicemiaStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { useNavigation } from '@react-navigation/native';

const Create = () => {
  const navigation = useNavigation();
  const [valorGlicemia, setGlicemia] = useState('');
  const [dataHora, setHorario] = useState('');
  const [loading, setLoading] = useState(false);

  const getUserId = async () => {
    try {
      const userId = await AsyncStorage.getItem('id');
      if (userId !== null) {
        console.log('ID do usuário recuperado com sucesso:', userId);
        return userId;
      } else {
        console.log('Nenhum ID de usuário encontrado');
      }
    } catch (error) {
      console.error('Erro ao recuperar o ID do usuário:', error.message);
    }
    return null;
  };

  const handleSave = async () => {
    setLoading(true); // Mostrar carregamento enquanto a requisição está sendo feita
    try {
      const userId = await getUserId();
      if (userId === null) {
        Alert.alert('Erro', 'ID do usuário não encontrado. Por favor, faça login novamente.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://127.0.0.1:8080/glicemia/save/' + userId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ valorGlicemia, dataHora }),
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        Alert.alert('Registro Salvo', 'Seu registro de glicemia foi salvo com sucesso.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao cadastrar glicemia. Por favor, tente novamente.');
    } finally {
      setLoading(false); // Ocultar carregamento após a requisição
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={{ uri: 'https://agecon.unl.edu/images/icons/natres-icon.png' }}
          style={styles.logo}
        />
        <Text style={styles.titulo}>Registro de Glicemia</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o valor da glicemia"
          onChangeText={setGlicemia}
          value={valorGlicemia}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Digite o horário"
          onChangeText={setHorario}
          value={dataHora}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Salvar Registro" onPress={handleSave} />
        )}
      </ScrollView>

      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Relatorios')}>
          <Icon name="home" size={24} color="#007bff" />
          <Text style={styles.navButtonText}>Relatórios</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Glicemia')}>
          <Icon name="plus" size={24} color="#007bff" />
          <Text style={styles.navButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Configuração')}>
          <Icon name="user" size={24} color="#007bff" />
          <Text style={styles.navButtonText}>Configuração</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default Create;
