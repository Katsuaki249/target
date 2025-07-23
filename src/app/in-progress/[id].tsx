import { View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

import { PageHeader } from '@/components/PageHeader';
import { Progress } from '@/components/Progress';
import { List } from '@/components/List';
import { Transaction, TransactionProps } from '@/components/Transaction';

import { TransactionTypes } from '@/utils/TransactionTypes';

const details = {
  current: 'R$ 525,00',
  target: 'R$ 3.500,00',
  percentage: 15,
};

const transactions: TransactionProps[] = [
  {
    id: '1',
    value: 'R$ 275,00',
    date: '12/04/25',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypes.Input,
  },
  {
    id: '2',
    value: 'R$ 25,00',
    date: '12/04/25',
    type: TransactionTypes.Output,
  },
  {
    id: '3',
    value: 'R$ 275,00',
    date: '11/01/25',
    description: 'CDB de 110% no banco XPTO',
    type: TransactionTypes.Input,
  },
];

export default function InProgress() {
  const params = useLocalSearchParams<{ id: string }>();

  return (
    <View style={{ flex: 1, padding: 24, gap: 22 }}>
      <PageHeader
        title="Macbook"
        rightButtom={{ icon: 'edit', onPress: () => {} }}
      />

      <Progress data={details} />

      <List
        title="Transações"
        data={transactions}
        renderItem={({ item }) => (
          <Transaction data={item} onRemove={() => {}} />
        )}
      />
    </View>
  );
}
