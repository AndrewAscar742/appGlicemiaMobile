import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const ConfigScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [backupEnabled, setBackupEnabled] = useState(false);
  const [fastingGoal, setFastingGoal] = useState('');
  const [postMealGoal, setPostMealGoal] = useState('');
  const [email, setEmail] = useState('');
  const [peso, setWeight] = useState('');
  const [altura, setHeight] = useState('');
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

      const response = await fetch('http://127.0.0.1:8080/usuario/atualizar/' + userId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, peso, altura }),
      });

      const data = await response.json();
      console.log(data);

      if (data) {
        Alert.alert('Registro Salvo', 'Seu registro de email foi atualizado com sucesso.');
      }
    } catch (error) {
      Alert.alert('Erro', error.message || 'Erro ao cadastrar glicemia. Por favor, tente novamente.');
    } finally {
      setLoading(false); // Ocultar carregamento após a requisição
    }

    // Aqui você implementará a chamada à API futuramente
    console.log('Dados salvos', { email, peso, altura });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.configSection}>
          <Text style={styles.title}>Configurações</Text>

          <View style={styles.settingContainer}>
            <Text>Deseja receber notificação do aplicativo?</Text>
            <CheckBox 
              isChecked={notificationsEnabled} 
              onClick={() => setNotificationsEnabled(!notificationsEnabled)} 
            />
          </View>
          
          <View style={styles.settingContainer}>
            <Text>Ativar modo Backup Automático?</Text>
            <CheckBox 
              isChecked={backupEnabled} 
              onClick={() => setBackupEnabled(!backupEnabled)} 
            />
          </View>
          
          <View style={styles.goalContainer}>
            <Text>Meta de glicemia em jejum</Text>
            <TextInput 
              style={styles.goalInput} 
              placeholder="Valor" 
              value={fastingGoal} 
              onChangeText={setFastingGoal} 
              keyboardType="numeric" 
            />
          </View>
          
          <View style={styles.goalContainer}>
            <Text>Meta de glicemia após o jantar</Text>
            <TextInput 
              style={styles.goalInput} 
              placeholder="Valor" 
              value={postMealGoal} 
              onChangeText={setPostMealGoal} 
              keyboardType="numeric" 
            />
          </View>
        </View>

        <View style={styles.personalSection}>
          <Text style={styles.title}>Dados Pessoais</Text>

          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Peso" 
            value={peso} 
            onChangeText={setWeight} 
            keyboardType="numeric"
          />
          <TextInput 
            style={styles.input} 
            placeholder="Altura" 
            value={altura} 
            onChangeText={setHeight} 
            keyboardType="numeric"
          />
        </View>

        <Button title="Salvar" onPress={handleSave} />
      </ScrollView>
      
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('Dashboard')}>
          <Icon name="home" size={24} color="#007bff" />
          <Text style={styles.navButtonText}>Dashboard</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  topBar: {
    width: '100%',
    height: 50,
    backgroundColor: '#ffa398',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 100, // Para garantir que todo o conteúdo seja visível
  },
  configSection: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  personalSection: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
  },
  goalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  goalInput: {
    width: 60,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    textAlign: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
  },
  navButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  navButtonText: {
    color: '#007bff',
    marginTop: 5,
  },
});

export default ConfigScreen;
