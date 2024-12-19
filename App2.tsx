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
import React, {useState} from 'react';
import Nav from './src/nav';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.light,
  };
  // const [text, setText] = useState('');

  // function randomDecimal(min:number, max:number, precision:number) {
  //   return (Math.random() * (max - min) + min).toFixed(precision);
  // }

  // const randomNumbers = Array.from({ length: 10 }, () =>
  //     parseFloat(randomDecimal(2, 20, 1))
  // );
  const numArr1 = [
    6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18, 19, 3.5, 4.5, 5.5, 6.5, 7.5,
    8.5, 9.5, 2.7, 4.2,
  ];
  const numArrObj = numArr1.map(item => ({num: item, percent: ''}));
  const [numArr, setNumArr] = useState(numArrObj);
  function shuffleArray(array: Array<{num: number; percent: string}>) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const onPressLearnMore = () => {
    let percent = [];
    setNumArr(numArrObj);
    percent = numArrObj.map(item => {
      return {
        num: Number((Number((1 / item.num).toFixed(3)) * 100).toFixed(1)),
        percent: '',
      };
    });
    const shuffleArrayPercent = shuffleArray(percent);

    setNumArr(shuffleArrayPercent);
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
        {/* <TextInput
          style={{
            height: 40,
            borderColor: 'gray',
            borderWidth: 1,
          }}
          placeholder="You can type in me"
          onChangeText={text => setText(text)}
        />
        <Text>
          {text
            .split(' ')
            .map(word => word && '🍪')
            .join(' ')}
        </Text> */}
        <Button
          onPress={onPressLearnMore}
          title="Learn More"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        {numArr.map((item: any, index: number) => {
          if (1 / Number(Number(item.percent).toFixed(3))) {
            console.log('a', 1 / Number(Number(item.percent).toFixed(3)));
          }
          return <ComputedItem item={item} index={index} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const ComputedItem = (item: any, index: number) => {
  const onChangeNumber = (e: any) => {
    console.log('ccy ', e.target.value);
  };
  const onBlurHandler = () => {};
  return (
    <View
      key={index}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      }}>
      <View>
        <Text>{item.num}% = 1/</Text>
      </View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        onBlur={onBlurHandler}
        // value={item.percent}
      />

      {<Text> ✅ </Text>}
      {<Text> ❌ </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255,0.3)',
    borderRadius: 10,
    width: '50%',
    height: 40,
  },
});

export default App;
