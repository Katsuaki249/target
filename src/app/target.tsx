import { router } from 'expo-router';
import { Text, View, Button } from 'react-native';

export default function Target() {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text>Expo Router</Text>

      <Button title="Voltar" onPress={() => router.back()} />
    </View>
  );
}
