import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#D9D9D9',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 90,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: '100%',
    height: 60,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    color: '#000',
  },
});

export default styles;
