import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import CountDownTimer from './components/countDownTimer';
import Header from './components/header';

export default function App() {
  const url = 'http://ergast.com/api/f1/current.json';

  const [races, setRaces] = useState(null);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setRaces(data.MRData.RaceTable.Races))
      .catch(error => console.error(error));
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Image style={styles.logo} source={require('./resources/f1.png')} />
        <View style={styles.list}>
          <FlatList
            data={races}
            renderItem={({ item }) => (
              <View style={styles.race}>
                <Text>{item.raceName} / {item.Circuit.Location.country}</Text>
                <Text>Q1-Q2-Q3</Text>
                <Text>{new Date(item.Qualifying.date + 'T' + item.Qualifying.time).toLocaleString('pt-BR')}</Text>
                <Text>Corrida Principal</Text>
                <Text>{new Date(item.date + 'T' + item.time).toLocaleString('pt-BR')}</Text>
                <CountDownTimer raceDate={item.date + 'T' + item.time} />
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  list: {
    flex: 1,
    marginTop: 20,
  },
  race: {
    padding: 8,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
