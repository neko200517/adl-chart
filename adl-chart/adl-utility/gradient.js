import React from 'react';
import {Defs, LinearGradient, Stop} from 'react-native-svg';

/**
 * グラデーション定義
 * @returns
 */
const Gradient = () => {
  return (
    <Defs key={'gradient'}>
      <LinearGradient id={'default'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'} />
        <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'} />
      </LinearGradient>

      <LinearGradient
        id={'Ripe_Malinka'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#f5576c'} />
        <Stop offset={'100%'} stopColor={'#f093fb'} />
      </LinearGradient>

      <LinearGradient
        id={'Malibu_Beach'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#4facfe'} />
        <Stop offset={'100%'} stopColor={'#00f2fe'} />
      </LinearGradient>

      <LinearGradient id={'River_City'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#4481eb'} />
        <Stop offset={'100%'} stopColor={'#04befe'} />
      </LinearGradient>

      <LinearGradient id={'Seashore'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#209cff'} />
        <Stop offset={'100%'} stopColor={'#68e0cf'} />
      </LinearGradient>

      <LinearGradient
        id={'True_Sunset'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#fa709a'} />
        <Stop offset={'100%'} stopColor={'#fee140'} />
      </LinearGradient>

      <LinearGradient
        id={'North_Miracle'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#fc00ff'} />
        <Stop offset={'100%'} stopColor={'#00dbde'} />
      </LinearGradient>

      <LinearGradient
        id={'Fruit_Blend'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#ff4e50'} />
        <Stop offset={'100%'} stopColor={'#f9d423'} />
      </LinearGradient>

      <LinearGradient
        id={'Millennium_Pine'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#50cc7f'} />
        <Stop offset={'100%'} stopColor={'#f5d100'} />
      </LinearGradient>

      <LinearGradient
        id={'Norse_Beauty'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#7873f5'} />
        <Stop offset={'100%'} stopColor={'#ec77ab'} />
      </LinearGradient>

      <LinearGradient
        id={'Sharp_Blues'}
        x1={'0'}
        y={'0%'}
        x2={'100%'}
        y2={'0%'}>
        <Stop offset={'0%'} stopColor={'#005bea'} />
        <Stop offset={'100%'} stopColor={'#00c6fb'} />
      </LinearGradient>
    </Defs>
  );
};

export default Gradient;
