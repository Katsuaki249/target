import { View } from 'react-native';

import { HomeHeader } from '@/components/HomeHeader';
import { Target } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Button';
import { router } from 'expo-router';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
};

const targets = [
  {
    id: '1',
    name: 'Macbook',
    current: 'R$ 500,00',
    percentage: '7%',
    target: 'R$ 3500,00',
  },
  {
    id: '2',
    name: 'Comprar estante para teclado',
    current: 'R$ 35,70',
    percentage: '10%',
    target: 'R$ 357,00',
  },
  {
    id: '3',
    name: 'Fazer uma viagem para Campos do Jordão',
    current: 'R$ 300,00',
    percentage: '10%',
    target: 'R$ 3000,00',
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <List
        title="Metas"
        data={targets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Target
            data={item}
            onPress={() => router.navigate(`/in-progress/${item.id}`)}
          />
        )}
        emptyMessage="Nenhum meta. Toque em nova meta para criar."
        containerStyle={{ paddingHorizontal: 24 }}
      />

      <View style={{ padding: 24, paddingBottom: 32 }}>
        <Button title="Nova Meta" onPress={() => router.navigate('/target')} />
      </View>
    </View>
  );
}
