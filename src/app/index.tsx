import { View } from 'react-native';

import { HomeHeader } from '@/components/HomeHeader';
import { Target } from '@/components/Target';

const summary = {
  total: 'R$ 2.680,00',
  input: { label: 'Entradas', value: 'R$ 6,184.90' },
  output: { label: 'Saídas', value: '-R$ 883.65' },
};

const targets = [
  {
    name: 'Comprar estante para teclado',
    current: '35,70',
    percentage: '10%',
    target: '357,00',
  },
];

export default function Index() {
  return (
    <View style={{ flex: 1 }}>
      <HomeHeader data={summary} />

      <Target data={targets[0]} />
    </View>
  );
}
