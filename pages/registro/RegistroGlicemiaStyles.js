import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
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

export default styles;