import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

/**
 * アイコン(メモ、運動、食事)を描画するクラス
 */
class IconImage {
  constructor(props, systemProps) {
    const hour = props.hour - systemProps.startHour;
    this.type = props.type;

    const height = systemProps.height;
    const width = systemProps.width;
    const areaWidth = systemProps.areaWidth;
    const zIndex = systemProps.zIndex;

    // アイコンの位置
    let top = systemProps.rowTop * hour + systemProps.iconMarginY;
    top += (systemProps.chartHeight - height) * 0.5;

    this.setStyle({
      top: top,
      areaWidth: areaWidth,
      width: width,
      height: height,
      zIndex: zIndex,
    });
  }

  setStyle(data) {
    this.styles = StyleSheet.create({
      style: {
        $: {
          position: 'absolute',
          top: data.top,
          left: data.areaWidth * 0.5 - data.width * 0.5,
          width: data.width,
          height: data.height,
          zIndex: data.zIndex,
        },
      },
    });
  }

  getView() {
    let source = '';
    switch (this.type) {
      case 'eat':
      case 'e':
        source = require('test/assets/images/icon_eat.png');
        break;
      case 'activity':
      case 'a':
        source = require('test/assets/images/icon_activity.png');
        break;
      default:
        source = require('test/assets/images/icon_memo.png');
        break;
    }
    return <Image style={this.styles.style.$} source={source} />;
  }
}

export default IconImage;
