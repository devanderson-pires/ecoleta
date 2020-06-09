import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Image, ImageBackground, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

interface IBGEUFResponse {
  sigla: string;
};

interface IBGECityResponse {
  nome: string;
};

const Home = () => {

  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {

    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(res => {
      
      const ufInitials = res.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {

    if(selectedUf === '0') return;

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(res => {
      
      const cityNames = res.data.map(city => city.nome);
      setCities(cityNames);
    });
  }, [selectedUf]);

  const navigation = useNavigation();

  function handleNavigateToPoints() {

    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    });
  };

  return(
    <ImageBackground 
    source={require('../../assets/home-background.png')} 
    imageStyle={{ height: 368, width: 274 }}
    style={styles.container}>
      <View style={styles.main}>
        <Image source={require('../../assets/logo.png')} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
      </View>

      <View>
        <RNPickerSelect 
          style={{
            inputIOS: {
              backgroundColor: '#FFF',
              borderRadius: 10,
              fontSize: 16,
              height: 60,
              marginBottom: 8,
              paddingHorizontal: 24,
            }
          }}
          placeholder={{
            label: 'Selecione o estado',
            value: null
          }}
          onValueChange={value => setSelectedUf(value)}
          items={ufs.map(uf => (
            { label: uf, value: uf }
          ))}
        />

        <RNPickerSelect 
          style={{
            inputIOS: {
              backgroundColor: '#FFF',
              borderRadius: 10,
              fontSize: 16,
              height: 60,
              marginBottom: 8,
              paddingHorizontal: 24,
            }
          }}
          placeholder={{
            label: 'Selecione a cidade',
            value: null
          }}
          onValueChange={value => setSelectedCity(value)}
          items={cities.map(city => (
            { label: city, value: city }
          ))}
        />

        <RectButton style={styles.button} onPress={handleNavigateToPoints}>
          <View style={styles.buttonIcon}>
            <Text>
              <Icon name='arrow-right' color='#fff' size={24} />
            </Text>
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

export default Home;
