import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Button,
  TextInput,
  useColorScheme,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {DeviceEventEmitter} from 'react-native';

type Props = {
  item: any;
  index: number;
};
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  // const [numArr, setNumArr] = useState<any[]>([]);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.light,
  };

  // function randomDecimal(min: number, max: number, precision: number) {
  //   const number = parseFloat(
  //     (Math.random() * (max - min) + min).toFixed(precision),
  //   );
  //   const numObject = {
  //     number,
  //     percent: Number((Number((1 / number).toFixed(3)) * 100).toFixed(1)) + '%',
  //   };
  //   return numObject;
  // }

  useEffect(() => {
    setNumArr(getPercentArray());
    console.log('ccy randomNumbers', getPercentArray());
  }, []);
  // const onPressLearnMore = () => {
  //   const randomNumbers = Array.from({length: 10}, () =>
  //     randomDecimal(2, 20, 1),
  //   );
  //   setNumArr(randomNumbers);
  // };
  const numArr1 = [
    6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 3.5, 4.5, 5.5, 6.5, 7.5,
    8.5, 9.5, 2.7, 4.2,
  ];
  const numArrObj = numArr1.map(item => ({num: item, percent: 0}));
  const [numArr, setNumArr] = useState(numArrObj);
  function shuffleArray(array: Array<{num: number; percent: number}>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const getPercentArray = () => {
    let percent = [];
    percent = numArrObj.map(item => {
      return {
        num: item.num,
        percent: Number((Number((1 / item.num).toFixed(3)) * 100).toFixed(1)),
      };
    });
    return shuffleArray(percent);
  };
  const onPressLearnMore = () => {
    setNumArr(numArrObj);
    setNumArr(getPercentArray());
  };

  const showAnswer = () => {
    DeviceEventEmitter.emit('isshowAnswer');
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.flexRow}>
          <Button
            onPress={onPressLearnMore}
            title="换一换"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
          <Button
            onPress={onPressLearnMore}
            title="清空"
            color="pink"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>

        {numArr.map((item: any, index: number) => {
          return (
            <ComputedItem
              key={`${item?.num}_${index}`}
              item={item}
              index={index}
            />
          );
        })}
        <Button
          onPress={showAnswer}
          title="检查答案"
          color="#00b82e"
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const ComputedItem: React.FC<Props> = ({item, index}) => {
  const [isshow, setIsshow] = useState('');
  const answer = useRef(null);
  const num = useRef(0);
  const onChangeNumber = (e: any) => {
    num.current = parseFloat(e);
  };
  const onBlurHandler = (mode?: string) => {
    if (!num && mode !== 'common') {
      return;
    }
    answer.current = item.num;
    if (answer.current == num.current) {
      setIsshow('1');
    } else {
      setIsshow('2');
    }
  };

  useEffect(() => {
    const listen = DeviceEventEmitter.addListener('isshowAnswer', () => {
      onBlurHandler('common');
    });
    return () => {
      listen.remove();
    };
  }, []);
  return (
    <View
      key={`item_${index}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <View>
        <Text>{item?.percent}% = 1/</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        // onBlur={(onBlurHandler)}
      />

      {isshow === '1' && <Text> ✅ </Text>}
      {isshow === '2' && <Text> ❌ </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '50%',
    height: 40,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default App;
