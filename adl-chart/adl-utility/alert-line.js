import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

/**
 * アラートが発生したライン
 */
class AlertLine {
  constructor(obj, color, commonProps) {
    const startTime = obj.startTime - commonProps.startHour;
    const top = commonProps.rowTop * startTime;
    const height = 2;

    this.setStyle(top, height, color);
  }

  setStyle(top, height, color) {
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
    });
  }

  getView() {
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
        }}>
        <View style={this.styles.style.$} />
      </View>
    );
  }
}

export default AlertLine;
