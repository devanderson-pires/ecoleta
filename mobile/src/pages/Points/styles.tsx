import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 20,
  },

  title: {
    fontFamily: 'Ubuntu_700Bold',
    fontSize: 20,
    marginTop: 24,
  },

  description: {
    color: '#6C6C80',
    fontFamily: 'Roboto_400Regular',
    fontSize: 16,
    marginTop: 4,
  },

  mapContainer: {
    borderRadius: 10,
    flex: 1,
    marginTop: 16,
    overflow: 'hidden',
    width: '100%',
  },

  map: {
    height: '100%',
    width: '100%',
  },

  mapMarker: {
    height: 80, 
    width: 90,
  },

  mapMarkerContainer: {
    alignItems: 'center',
    backgroundColor: '#34CB79',
    borderRadius: 8,
    flexDirection: 'column',
    height: 70,
    overflow: 'hidden',
    width: 90,
  },

  mapMarkerImage: {
    height: 45,
    resizeMode: 'cover',
    width: 90,
  },
  
  mapMarkerTitle: {
    color: '#FFF',
    flex: 1,
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    lineHeight: 23,
  },

  itemsContainer: {
    flexDirection: 'row',
    marginBottom: 32,
    marginTop: 16,
  },

  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#eee',
    borderRadius: 8,
    borderWidth: 2,
    height: 120,
    justifyContent: 'space-between',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 20,
    marginRight: 8,
    textAlign: 'center',
    width: 120,
  },

  selectedItem: {
    borderColor: '#34CB79',
    borderWidth: 2,
  },

  itemTitle: {
    fontFamily: 'Roboto_400Regular',
    fontSize: 13,
    textAlign: 'center',
  },
});

export default styles;
