import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';

const details = {
  current: 'R$ 525,00',
  target: 'R$ 3.500,00',
  percentage: 15,
};

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 22 }}>
      <PageHeader
        title="Macbook"
        rightButtom={{ icon: 'edit', onPress: () => {} }}
      />

      <Progress data={details} />
    </View>
  );
}
