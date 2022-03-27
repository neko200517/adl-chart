import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

/**
 * 活動時間外の矩形クラス
 */
class SleepHourRect {
  constructor(obj, color, commonProps) {
    const startTime = obj.startTime - commonProps.startHour;
    const endTime = startTime + obj.interval;

    const rowTop = commonProps.rowTop;
    const dayOfHour = commonProps.dayOfHour;

    // 時間外の範囲1
    const targetStartHour = startTime;
    const targetEndHour = endTime > dayOfHour ? dayOfHour : endTime;
    const targetTop = rowTop * targetStartHour;
    const targetHourRange = (targetEndHour - targetStartHour) * rowTop;

    // 時間外の範囲2
    const targetStartHour2 = 0;
    const targetEndHour2 = endTime > dayOfHour ? endTime - dayOfHour : 0;
    const targetTop2 = rowTop * targetStartHour2;
    const targetHourRange2 = (targetEndHour2 - targetStartHour2) * rowTop;

    this.setStyle(
      targetTop,
      targetHourRange,
      targetTop2,
      targetHourRange2,
      color,
    );
  }

  setStyle(top, height, top2, height2, color) {
    this.styles = StyleSheet.create({
      style: {
        $: {
          position: 'absolute',
          top: top,
          left: 0,
          height: height,
          width: '100%',
          backgroundColor: color,
        },
      },
      style2: {
        $: {
          position: 'absolute',
          top: top2,
          left: 0,
          height: height2,
          width: '100%',
          backgroundColor: color,
        },
      },
    });
  }

  getView() {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
        }}>
        <View // 範囲_活動時間外
          style={this.styles.style.$}
        />
        <View // 範囲_活動時間外2
          style={this.styles.style2.$}
        />
      </View>
    );
  }
}

export default SleepHourRect;
