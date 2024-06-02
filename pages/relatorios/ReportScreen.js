import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

const ReportScreen = ({ navigation }) => { // Adicione a prop navigation aqui
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reportType, setReportType] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const showStartDate = () => setShowStartDatePicker(true);
  const showEndDate = () => setShowEndDatePicker(true);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setStartDate(selectedDate || startDate);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setEndDate(selectedDate || endDate);
  };

  const generateReport = () => {
    console.log(`Gerando relatório: ${reportType} de ${startDate.toLocaleDateString()} a ${endDate.toLocaleDateString()}`);
    navigation.navigate('ReportView'); // Agora a navigation está disponível aqui
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#fff' }]}>Intervalo de tempo</Text>
        <View style={styles.dateContainer}>
          <TouchableOpacity onPress={showStartDate}>
            <Text style={[styles.dateSeparator, { color: '#fff' }]}>De: {startDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}
          <TouchableOpacity onPress={showEndDate}>
            <Text style={[styles.dateSeparator, { color: '#fff' }]}>Para: {endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#fff' }]}>Tipo de relatório</Text>
        <View style={styles.radioContainer}>
          <Pressable style={styles.radioButton} onPress={() => setReportType('acucarNoSangue')}>
            <View style={styles.radioCircle}>
              {reportType === 'acucarNoSangue' && <View style={styles.selectedRb} />}
            </View>
            <Text style={[styles.radioText, { color: '#fff' }]}>Açúcar no sangue</Text>
            <Icon name="tint" size={20} color="#fff" style={styles.iconStyle} />
          </Pressable>
          <Pressable style={styles.radioButton} onPress={() => setReportType('pressaoSanguinea')}>
            <View style={styles.radioCircle}>
              {reportType === 'pressaoSanguinea' && <View style={styles.selectedRb} />}
            </View>
            <Text style={[styles.radioText, { color: '#fff' }]}>Pressão Sanguínea</Text>
            <Icon name="heartbeat" size={20} color="#fff" style={styles.iconStyle} />
          </Pressable>
          <Pressable style={styles.radioButton} onPress={() => setReportType('medicamento')}>
            <View style={styles.radioCircle}>
              {reportType === 'medicamento' && <View style={styles.selectedRb} />}
            </View>
            <Text style={[styles.radioText, { color: '#fff' }]}>Medicamento</Text>
            <Icon name="medkit" size={20} color="#fff" style={styles.iconStyle} />
          </Pressable>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={generateReport}>
        <Text style={styles.buttonText}>GERAR RELATÓRIO</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  section: {
    backgroundColor: '#FF9999',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  dateSeparator: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#000',
  },
  radioContainer: {
    marginVertical: 20,
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  selectedRb: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#000',
  },
  radioText: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  iconStyle: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#FF9999',
    padding: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ReportScreen;
