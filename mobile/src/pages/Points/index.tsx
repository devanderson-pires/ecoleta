import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SvgUri } from 'react-native-svg';

import styles from './styles';

import api from '../../services/api';

interface Item {
  id: number,
  title: string,
  image_url: string;
};

interface Point {
  id: number,
  image: string,
  image_url: string,
  name: string,
  latitude: number,
  longitude: number,
};

interface Params {
  uf: string,
  city: string;
};

const Points = () => {

  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
  const [points, setPoints] = useState<Point[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  useEffect(() => {
    
    api.get('points', {
      params: {
        city: routeParams.city,
        uf: routeParams.uf,
        items: selectedItems
      }
    }).then(res => setPoints(res.data));
  }, [selectedItems]);
  
  useEffect(() => {
    
    async function loadPosition() {
      
      const { status } = await Location.requestPermissionsAsync();
      
      if(status !== 'granted') {
        
        Alert.alert('Precisamos da sua permissão para obter a localização');
        return;
      };
      
      const location = await Location.getCurrentPositionAsync();
      
      const { latitude, longitude } = location.coords;
      
      setInitialPosition([latitude, longitude]);
    };
    
    loadPosition();
  }, []);
  
  useEffect(() => {
    
    api.get('items').then(res => setItems(res.data));
  }, []);

  function handleNavigateBack() {

    navigation.goBack();
  };

  function handleNavigateToDetail(id: number) {

    navigation.navigate('Detail', { point_id: id });
  };
  
  function handleSelectItem(id: number) {
    
    const alreadySelected = selectedItems.findIndex(item => item === id);
    
    if(alreadySelected >= 0) {
      
      const filteredItems = selectedItems.filter(item => item !== id);
      setSelectedItems(filteredItems);
    } else {
      
      setSelectedItems([...selectedItems, id]);
    };
  };
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" color="#34cb79" size={20} />
        </TouchableOpacity>

        <Text style={styles.title}>Bem vindo</Text>
        <Text style={styles.description}>Encontre no mapa um ponto de coleta.</Text>

        <View style={styles.mapContainer}>
          { initialPosition[0] !== 0 && (
            <MapView 
            style={styles.map} 
            initialRegion={{
              latitude: initialPosition[0],
              longitude: initialPosition[1],
              latitudeDelta: 0.014,
              longitudeDelta: 0.014
            }}>
              {points.map(point => (
                <Marker 
                key={String(point.id)}
                style={styles.mapMarker}
                onPress={() => handleNavigateToDetail(point.id)}
                coordinate={{
                  latitude: point.latitude,
                  longitude: point.longitude,
                }}
                >
                  <View style={styles.mapMarkerContainer}>
                    <Image style={styles.mapMarkerImage} source={{ uri: point.image_url }} />
                    <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                  </View>
                </Marker> 
              ))}
            </MapView>
          )}
        </View>
      </View>

      <View style={styles.itemsContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{paddingHorizontal: 32}}>
          {items.map(item => (
            <TouchableOpacity 
              key={String(item.id)} 
              style={[
                styles.item,
                selectedItems.includes(item.id) ? styles.selectedItem : {}
              ]} 
              onPress={() => handleSelectItem(item.id)}
              activeOpacity={.6}
            >
              <SvgUri height={42} width={72} uri={item.image_url} />
              <Text style={styles.itemTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Points;
