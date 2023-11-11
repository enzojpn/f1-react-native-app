import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function CountDownTimer({ raceDate }) {
  const calculateTimeLeft = () => {
    const difference = new Date(raceDate).getTime() - new Date().getTime();
    const isTimeLeft = difference > 0;

    if (isTimeLeft) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds, isTimeLeft };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isTimeLeft };
    }
  };

  const [remainingTime, setRemainingTime] = useState(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      const newRemainingTime = calculateTimeLeft();
      setRemainingTime(newRemainingTime);

      if (!newRemainingTime.isTimeLeft) {
        clearInterval(interval); // Se o tempo restante for zero, para o intervalo
      }
    }, 1000);

    return () => clearInterval(interval); // Cleanup do intervalo quando o componente é desmontado
  }, [raceDate]);

  const { days, hours, minutes, seconds } = remainingTime;

  if (days > 0 || hours > 0 || minutes > 0 || seconds > 0) {
    return (
      <View>
        <Text style={styles.andamento}>
          Faltam {days} dias {hours} h {minutes} m {seconds} s
        </Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text style={styles.concluido}>GP concluído</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  concluido: {
    flex: 1,
    backgroundColor: 'red',
  },
  andamento: {
    flex: 1,
    backgroundColor: 'lawngreen',
  },
});
