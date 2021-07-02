import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  LogBox,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firebase from 'firebase';
import 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';

export default function Chat({ navigation, route }) {
  //Remove React warnings for firebase timers
  LogBox.ignoreLogs(['Setting a timer']);

  //Props from user input on welcome screen
  const { name, colorScheme } = route.params;

  //Hook for online status
  const netInfo = useNetInfo();

  let [messages, setMessages] = useState([]),
    [user, setUser] = useState({}),
    [isLoading, setIsLoading] = useState(false);

  const firebaseConfig = {
    apiKey: 'AIzaSyCsZEzJdRg2sGdrt1wIIWmH9j8AsvELdPE',
    authDomain: 'chatify-1523e.firebaseapp.com',
    projectId: 'chatify-1523e',
    storageBucket: 'chatify-1523e.appspot.com',
    messagingSenderId: '1003427272429',
    appId: '1:1003427272429:web:1461b1c693aa1051455ee4',
    measurementId: 'G-H7DKZSHJS9',
  };

  //If not initialized -- initialize
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  //Create reference to store
  const refMessages = firebase.firestore().collection('messages');

  //Retrieve messages from firestore
  const getMessages = () => {
    return refMessages
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          messages.push({
            _id: data._id,
            createdAt: data.createdAt.toDate(),
            text: data.text,
            user: data.user,
          });
        });
        setMessages(messages);
        saveMessages(messages); //Called here so that asyncstorage accurately reflects firebase store
      });
  };

  //Auth via firebase
  const authenticateUser = () => {
    return firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        setIsLoading(true);
        await firebase.auth().signInAnonymously();
      }

      const userData = {
        _id: user.uid,
        name: name,
        avatar: 'https://placeimg.com/140/140/any',
      };

      setUser(userData);
      saveUser(userData);
      setIsLoading(false);
    });
  };

  //Adds message to firebase store
  const addMessage = (message) => {
    refMessages.add(message);
  };

  //Retrieve local messages/user (used on initial mount/when offline)
  const loadLocalData = async () => {
    try {
      const savedMessages = await (AsyncStorage.getItem('messages') || []);
      const user = await (AsyncStorage.getItem('user') || {});
      setMessages(JSON.parse(savedMessages));
      setUser(JSON.parse(user));
    } catch (error) {
      console.error(error);
    }
  };

  //Save a local copy of the messages array
  const saveMessages = async (messages) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messages));
    } catch (error) {
      console.error(error);
    }
  };

  //Save user info locally
  const saveUser = async (user) => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      console.error(error);
    }
  };

  //Adds user's message to state and firebase store
  const onSend = useCallback((messages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    addMessage(messages[0]);
  }, []);

  //Custom renderBubble function to change wrapper (speech bubble) color
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{ right: { backgroundColor: colorScheme.rightBubble } }}
      />
    );
  };

  //Update title with user input -- useEffect to avoid component update warnings
  useEffect(() => navigation.setOptions({ title: name }), [navigation, name]);

  //Authenticate and subscribes to store on mount (reruns on netInfo change)
  useEffect(() => {
    loadLocalData();
    if (netInfo.isConnected) {
      //Run authentication and message requests and store returned unsub functions
      const authUnsub = authenticateUser();
      const refUnsub = getMessages();

      //Unsub on unmount
      return authUnsub && refUnsub;
    }
  }, [netInfo]);

  return (
    <View style={{ flex: 1, backgroundColor: colorScheme.background }}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <GiftedChat
          renderBubble={renderBubble}
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={user}
          renderUsernameOnMessage={true}
        />
      )}
    </View>
  );
}
