import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from "react-native";
import CheckBox from 'react-native-check-box';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReportScreen = ({ navigation }) => { // Adicione a prop navigation aqui
  const [isSugarChecked, setSugarChecked] = useState(false);
  const [isPressureChecked, setPressureChecked] = useState(false);
  const [isMedicationChecked, setMedicationChecked] = useState(false);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Intervalo de tempo</Text>
        <View style={styles.dateRange}>
          <TextInput
            style={styles.dateInput}
            placeholder="De --/--/----"
            placeholderTextColor="#aaa"
          />
          <TextInput
            style={styles.dateInput}
            placeholder="Para --/--/----"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={styles.additionalInfo}>
          <Text style={styles.sectionTitle}>Informações adicionais</Text>
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isMedicationChecked} // Substitui "value" por "isChecked"
              onClick={() => setMedicationChecked(!isMedicationChecked)} // Substitui "onValueChange" por "onClick"
              style={styles.checkbox}
            />

            <Text style={styles.label}>Açúcar no sangue</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isSugarChecked} // Substitui "value" por "isChecked"
              onClick={() => setSugarChecked(!isSugarChecked)} // Substitui "onValueChange" por "onClick"
              style={styles.checkbox}
            />

            <Text style={styles.label}>Pressão Sanguínea</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <CheckBox
              isChecked={isPressureChecked} // Substitui "value" por "isChecked"
              onClick={() => setPressureChecked(!isPressureChecked)} // Substitui "onValueChange" por "onClick"
              style={styles.checkbox}
            />

            <Text style={styles.label}>Medicamento</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.generateButton} onPress={() => navigation.navigate('ReportView')}>
          <Text style={styles.buttonText}>Gerar Relatório</Text>
        </TouchableOpacity>

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
      </ScrollView>

    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    padding: 0,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  dateRange: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    width: "100%",
  },
  dateInput: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
  },
  additionalInfo: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 8,
    width: "100%",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#555",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  generateButton: {
    backgroundColor: "#333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
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


export default ReportScreen;
