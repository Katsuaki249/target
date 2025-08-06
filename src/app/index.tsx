import { useCallback, useState } from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { router, useFocusEffect } from 'expo-router';

import { HomeHeader, HomeHeaderProps } from '@/components/HomeHeader';
import { Target, TargetProps } from '@/components/Target';
import { List } from '@/components/List';
import { Button } from '@/components/Button';
import { Loading } from '@/components/Loading';

import { numberToCurency } from '@/utils/numberToCurrency';

import { useTargetDatabase } from '@/database/useTargetDatabase';
import { useTransactionDatabase } from '@/database/useTransactionDatabase';

export default function Index() {
  const [summary, setSummary] = useState<HomeHeaderProps>();
  const [isFetching, setIsFetching] = useState(true);
  const [targets, setTargets] = useState<TargetProps[]>();
  const targetDatabase = useTargetDatabase();
  const transactionsDatabase = useTransactionDatabase();

  async function fetchTargets(): Promise<TargetProps[] | undefined> {
    try {
      const response = await targetDatabase.listByClosestTarget();

      return response.map((item) => ({
        id: String(item.id),
        name: item.name,
        current: numberToCurency(item.current),
        percentage: item.percentage.toFixed(0) + '%',
        target: numberToCurency(item.amount),
      }));
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as metas.');
      console.log(error);
    }
  }

  async function fetchSummary(): Promise<HomeHeaderProps | undefined> {
    try {
      const response = await transactionsDatabase.summary();

      if (response)
        return {
          total: numberToCurency(response.input + response.output),
          input: {
            label: 'Entradas',
            value: numberToCurency(response.input),
          },
          output: {
            label: 'Entradas',
            value: numberToCurency(response.output),
          },
        };
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o resumo.');
      console.log(error);
    }
  }

  async function fetchData() {
    const targetDataPromise = fetchTargets();
    const dataSummaryPromise = fetchSummary();

    const [targetData, dataSummary] = await Promise.all([
      targetDataPromise,
      dataSummaryPromise,
    ]);

    setTargets(targetData);
    setSummary(dataSummary);
    setIsFetching(false);
  }

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, []),
  );

  if (isFetching) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
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
