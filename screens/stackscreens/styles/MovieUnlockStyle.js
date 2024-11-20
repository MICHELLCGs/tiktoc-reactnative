import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    paddingTop:60
  },
  container_hijo: {
    flexDirection: 'row', 
    backgroundColor: '#f9f9f9',
    borderRadius: 10, 
    padding: 10,
    alignItems: 'center', 
    marginBottom: 15, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, 
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8, 
  },
  detailsContainer: {
    flex: 1, 
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row', 
    alignItems: 'center',
    backgroundColor: '#FF4500',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 5, 
    textTransform: 'uppercase',
  },
});

export default styles;
