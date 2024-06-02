import { View, Text, StyleSheet, TouchableOpacity, ScrollView} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';
import CircularProgress from "react-native-circular-progress-indicator";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [glicemiaData, setGlicemiaData] = useState([]);
  const [lastGlicemia, setLastGlicemia] = useState(null);
  const [status, setStatus] = useState("Normal");
  const [lastMeasurementTime, setLastMeasurementTime] = useState(null);

  useEffect(() => {
    
    getData();
  }, []);

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

  const getData = async () => {
    const userId = await getUserId();
    try {
      const response = await fetch("http://192.168.0.113:8080/glicemia/user/" + userId);

      const result = await response.json();
      if (result.length > 0) {
        setGlicemiaData(result);
        const lastMeasurement = result[result.length - 1];
        setLastGlicemia(lastMeasurement.valorGlicemia);
        setLastMeasurementTime(lastMeasurement.dataHora);
        setStatus(getStatus(lastMeasurement.valorGlicemia));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getStatus = (value) => {
    if (value < 70) return "Baixo";
    if (value > 140) return "Alto";
    return "Normal";
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Ultima Glicemia Medida</Text>
          <Text style={styles.title}>
            {lastGlicemia !== null ? `${lastGlicemia} mg/dl` : "Carregando..."}
          </Text>
          <Text style={styles.titleStatus}>{status}</Text>
        </View>
        <View style={styles.recent}>
          <Text style={styles.title}>Medidas Recentes</Text>
        </View>
        <View style={styles.results}>
          {glicemiaData.slice(0, 3).map((mesuarement, index) => (
            <View key={index} style={styles.area}>
              <Text style={styles.resultsTitle}>{mesuarement.valorGlicemia}</Text>
              <Text style={styles.resultsDate}>{mesuarement.dataHora}</Text>
            </View>
          ))}
        </View>
        <View style={styles.percentage}>
          <Text style={styles.percentageTitle}>Porcentagem de Saúde</Text>
          <CircularProgress
            value={lastGlicemia || 85}
            radius={80}
            title={`${lastGlicemia || 0} de 100`}
            progressValueColor={"#000"}
            activeStrokeColor={"#FF9999"}
            titleColor={"#000"}
            titleStyle={{ fontWeight: "bold" }}
          />
          <Text style={styles.percentageSecondaryTitle}>
            *Calculado com base nas medidas recentes
          </Text>
        </View>
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
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 100, // Add padding to avoid content being hidden behind the navbar
  },
  container: {
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 20,
    height: 120,
    width: "100%",
    backgroundColor: "#FF9999",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  titleStatus: {
    color: "#05FF00",
    fontSize: 20,
    fontWeight: "bold",
  },
  recent: {
    marginTop: 10,
  },
  area: {
    height: 100,
    width: 100,
    backgroundColor: "#FF9999",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  results: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 20,
    marginRight: 32,
  },
  resultsTitle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
  },
  resultsDate: {
    color: "#fff",
    marginTop: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  percentage: {
    alignItems: "center",
    justifyContent: "center",
  },
  percentageTitle: {
    fontSize: 26,
    marginBottom: 10,
    fontWeight: "bold",
  },
  percentageSecondaryTitle: {
    fontSize: 16,
    marginTop: 20,
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

export default Home;