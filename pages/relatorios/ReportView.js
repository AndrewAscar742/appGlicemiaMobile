import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const ReportView = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{"<"} Voltar</Text>
      </TouchableOpacity>
      <View style={styles.reportHeader}>
        <Text style={styles.title}>AÇÚCAR NO SANGUE</Text>
        <Text style={styles.subtitle}>RELATÓRIO</Text>
        <Text style={styles.dateProcessed}>Data de processamento: mai. 2024</Text>
        <Text style={styles.dateRange}>Intervalo de datas: mar. 21, 2024 - mar. 21, 2024</Text>
        <Text style={styles.generalView}>VISÃO GERAL</Text>
      </View>
      <View style={styles.reportContent}>
        <Text style={styles.entriesCount}>Total de entradas: 1</Text>
        <Text style={styles.normalCount}>Normal: 1/1</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Temporização</Text>
            <Text style={styles.tableHeader}>Status</Text>
            <Text style={styles.tableHeader}>mg/dL</Text>
            <Text style={styles.tableHeader}>Método</Text>
            <Text style={styles.tableHeader}>Base de tempo</Text>
            <Text style={styles.tableHeader}>Tag</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableData}>15:39</Text>
            <Text style={[styles.tableData, styles.normalStatus]}>Normal</Text>
            <Text style={styles.tableData}>80</Text>
            <Text style={styles.tableData}>FPG</Text>
            <Text style={styles.tableData}>Antes da refeição</Text>
            <Text style={styles.tableData}>Mão direita, Cafeína, Descanso, Antes da medicação</Text>
          </View>
        </View>
        <View style={styles.minMax}>
          <Text style={styles.minMaxText}>Mín: 80 mg/dL</Text>
          <Text style={styles.minMaxText}>Máx: 80 mg/dL</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
  reportHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  dateProcessed: {
    fontSize: 14,
    marginBottom: 5,
  },
  dateRange: {
    fontSize: 14,
    marginBottom: 5,
  },
  generalView: {
    fontSize: 18,
    marginTop: 10,
  },
  reportContent: {
    marginTop: 20,
  },
  entriesCount: {
    fontSize: 16,
    marginBottom: 5,
  },
  normalCount: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    width: '16%',
    textAlign: 'center',
  },
  tableData: {
    fontSize: 14,
    width: '16%',
    textAlign: 'center',
  },
  normalStatus: {
    color: 'green',
  },
  minMax: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  minMaxText: {
    fontSize: 14,
  },
});

export default ReportView;
