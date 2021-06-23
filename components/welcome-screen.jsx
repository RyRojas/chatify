import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

import background from '../assets/background-image.png';
import icon from '../assets/user-icon.png';

export default function WelcomeScreen({ navigation }) {
  let [name, setName] = useState(''),
    [bgColor, setBgColor] = useState('#090C08');

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert(null, 'Please enter your name');
    }

    navigation.navigate('Chat', { name: name, bgColor: bgColor });
  };

  return (
    <ImageBackground source={background} style={styles.image}>
      <Text style={styles.title}>Chatify</Text>

      <View style={styles.card}>
        <View style={styles.inputContainer}>
          <Image source={icon} />
          <TextInput
            style={[styles.inputField, styles.text]}
            placeholder="Your Name"
            placeholderTextColor="#757083"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.bgColorContainer}>
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.choiceContainer}>
            <View
              style={[
                styles.choiceHalo,
                bgColor === '#090C08' && { borderColor: bgColor },
              ]}
            >
              <TouchableOpacity
                style={styles.choice}
                onPress={() => setBgColor('#090C08')}
              />
            </View>
            <View
              style={[
                styles.choiceHalo,
                bgColor === '#474056' && { borderColor: bgColor },
              ]}
            >
              <TouchableOpacity
                style={[styles.choice, { backgroundColor: '#474056' }]}
                onPress={() => setBgColor('#474056')}
              />
            </View>
            <View
              style={[
                styles.choiceHalo,
                bgColor === '#8A95A5' && { borderColor: bgColor },
              ]}
            >
              <TouchableOpacity
                style={[styles.choice, { backgroundColor: '#8A95A5' }]}
                onPress={() => setBgColor('#8A95A5')}
              />
            </View>
            <View
              style={[
                styles.choiceHalo,
                bgColor === '#B9C6AE' && { borderColor: bgColor },
              ]}
            >
              <TouchableOpacity
                style={[styles.choice, { backgroundColor: '#B9C6AE' }]}
                onPress={() => setBgColor('#B9C6AE')}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Start Chatting</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  title: {
    flex: 0.44,
    marginTop: '6%',
    fontSize: 45,
    fontWeight: 'bold',
    color: '#fff',
  },

  card: {
    flex: 0.44,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    width: '88%',
    paddingHorizontal: '6%',
  },

  inputContainer: {
    flexDirection: 'row',
    opacity: 100,
    height: 50,
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
    alignItems: 'center',
    paddingLeft: 15,
  },

  inputField: {
    width: '100%',
    paddingLeft: 15,
  },

  bgColorContainer: {
    flexDirection: 'column',
    width: '100%',
    height: 100,
  },

  choiceContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },

  choice: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#090C08',
  },

  choiceHalo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#090C0800',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFF',
  },
});
