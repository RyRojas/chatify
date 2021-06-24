import React, { useState, useEffect } from 'react';
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
    [selectedScheme, setSelectedScheme] = useState({});

  const colorSchemes = [
    {
      name: 'Black',
      background: '#090C08',
      rightBubble: '#75a3c9',
    },
    {
      name: 'Purple',
      background: '#474056',
      rightBubble: '#726787',
    },
    {
      name: 'Blue',
      background: '#8A95A5',
      rightBubble: '#596d8c',
    },
    {
      name: 'Green',
      background: '#B9C6AE',
      rightBubble: '#829c69',
    },
  ];

  //Initialize state
  useEffect(() => setSelectedScheme(colorSchemes[0]), []);

  //Ensures username is entered prior to navigation
  const handleSubmit = () => {
    if (!name) {
      return Alert.alert(null, 'Please enter your name');
    }

    navigation.navigate('Chat', { name: name, colorScheme: selectedScheme });
  };

  const isSelected = (scheme) =>
    selectedScheme.background === scheme.background;

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

        <View
          style={styles.bgColorContainer}
          accessibilityLabel="Background color selector."
          accessibilityRole="radiogroup"
        >
          <Text style={styles.text}>Choose Background Color:</Text>
          <View style={styles.choiceContainer}>
            {colorSchemes.map((colorScheme) => (
              <View
                key={colorScheme.name}
                style={[
                  styles.choiceHalo,
                  isSelected(colorScheme) && {
                    borderColor: colorScheme.background,
                  },
                ]}
              >
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel={`${colorScheme.name} background choice.`}
                  accessibilityRole="radio"
                  accessibilityState={{
                    selected: isSelected(colorScheme),
                  }}
                  style={[
                    styles.choice,
                    { backgroundColor: colorScheme.background },
                  ]}
                  onPress={() => setSelectedScheme(colorScheme)}
                />
              </View>
            ))}
          </View>
        </View>

        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Start Chatting"
          accessibilityHint="Navigates to chat screen."
          accessibilityRole="button"
          style={styles.button}
          onPress={handleSubmit}
        >
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
    height: '100%',
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
    width: 48,
    height: 48,
    borderRadius: 24,
  },

  choiceHalo: {
    width: 56,
    height: 56,
    borderRadius: 28,
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
