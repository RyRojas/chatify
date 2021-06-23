import React from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';

export default function Chat({ navigation, route }) {
  const { name, bgColor } = route.params;

  //Update title with user input -- useEffect to avoid component update warnings
  React.useEffect(
    () => navigation.setOptions({ title: name }),
    [navigation, name]
  );

  return (
    <ScrollView style={{ backgroundColor: bgColor }}>
      <Text>You made it to Screen2!</Text>
    </ScrollView>
  );
}
