import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20,
  },

  pointImage: {
    borderRadius: 10,
    height: 120,
    marginTop: 32,
    resizeMode: 'cover',
    width: '100%',
  },

  pointName: {
    color: '#322153',
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 28,
    marginTop: 24,
  },

  pointItems: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },

  address: {
    marginTop: 32,
  },
  
  addressTitle: {
    color: '#322153',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },

  addressContent: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    lineHeight: 24,
    marginTop: 8,
  },

  footer: {
    borderColor: '#999',
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
    paddingVertical: 20,
  },

  button: {
    alignItems: 'center',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    width: '48%',
  },

  buttonText: {
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
    marginLeft: 8,
  },
});

export default styles;
