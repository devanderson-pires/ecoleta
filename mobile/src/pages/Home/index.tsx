import React, { useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Image, ImageBackground, Text, View } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Home = () => {

  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const navigation = useNavigation();

  function handleNavigateToPoints() {

    navigation.navigate('Points', {
      uf,
      city
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

      <View style={styles.footer}>
        <TextInput 
          style={styles.input} 
          placeholder='Digite a UF'
          value={uf}
          onChangeText={setUf}
          maxLength={2}
          autoCapitalize='characters'
          autoCorrect={false}
        />

        <TextInput 
          style={styles.input} 
          placeholder='Digite a Cidade'
          value={city}
          onChangeText={setCity}
          autoCorrect={false}
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
