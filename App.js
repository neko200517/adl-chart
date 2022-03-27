import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
import * as shape from 'd3-shape';
import {
  ADLBarChartDay,
  ADLBarChartMonth,
  ADLBarChartYear,
  ADLLineChartDay,
  ADLLineChartMonth,
  ADLLineChartYear,
  ADLMalChart,
} from './adl-chart';

// 定数
const _config = {
  chartType: {
    bar: 0,
    line: 1,
    mal: 2,
  },
  sampleDatas: {
    sleepHourProps: [
      {
        startTime: 22,
        interval: 8,
      },
    ],
    alertHourProps: [
      {
        startTime: 8,
        interval: 2,
      },
      {
        startTime: 17,
        interval: 1,
      },
    ],
    iconImageProps: [
      {
        hour: 8.5,
        type: 'memo',
      },
      {
        hour: 12.0,
        type: 'eat',
      },
      {
        hour: 15.0,
        type: 'activity',
      },
    ],
    alertLineProps: [
      {
        startTime: 9.0,
      },
    ],
    currentHourProps: [
      {
        startTime: 20.0,
      },
    ],
  },
};

export default class App extends Component {
  #window;

  // グラフを変更したい場合、ここを変更する
  #chartType = _config.chartType.mal;

  // 描画
  render() {
    // ウィンドウサイズ
    this.#window = Dimensions.get('window');
    const marginTop = 25;
    const bodyHeight = this.#window.height - marginTop;

    const styles = StyleSheet.create({
      body: {
        $: {
          backgroundColor: '#eee',
          height: bodyHeight,
          width: '100%',
          alignItems: 'center',
        },
      },
    });

    return (
      <ScrollView // body
        contentContainerStyle={styles.body.$}>
        {this.getComponent()}
      </ScrollView>
    );
  }

  // Componentの取得
  getComponent() {
    switch (this.#chartType) {
      case _config.chartType.bar:
        return this.barChartDemo();
        break;
      case _config.chartType.line:
        return this.lineChartDemo();
        break;
      default:
        return this.malChartDemo();
        break;
    }
  }

  // 動作料グラフのサンプル
  barChartDemo() {
    // サンプルデータ
    const startHour = 6; // 開始時間
    const endHour = 20; // 終了時間
    const vMax = 1000; // 最大値
    const vMin = 0; // 最小値
    let datas = [];
    let datas2 = [];
    for (let i = 0; i < endHour; i++) {
      if (i >= startHour) {
        datas.push(Math.random() * (vMax - vMin) + vMin);
        datas2.push(Math.random() * (vMax - vMin) + vMin);
      } else {
        datas.push(null);
        datas2.push(null);
      }
    }

    // コンポーネントのサイズ
    const marginTop = 25;
    const containerHeight = this.#window.height - marginTop;
    const containerWidth = this.#window.width * 0.9;

    // グラフの最大値
    const yMax = 1000;

    return (
      <ADLBarChartDay
        width={containerWidth}
        height={containerHeight}
        datas={{
          value1: datas, // 左手
          value2: datas2, // 右手
        }}
        yMax={yMax}
        sleepHourProps={_config.sampleDatas.sleepHourProps}
        alertHourProps={_config.sampleDatas.alertHourProps}
        iconImageProps={_config.sampleDatas.iconImageProps}
        alertLineProps={_config.sampleDatas.alertLineProps}
        currentHourProps={_config.sampleDatas.currentHourProps}
      />
    );
  }

  // バランスグラフのサンプル
  lineChartDemo() {
    // サンプルデータ
    const startHour = 6; // 開始時間
    const endHour = 22; // 終了時間
    const vMax = 1000; // 最大値
    const vMin = 0; // 最小値
    let datas = [];
    let datas2 = [];
    for (let i = 0; i < endHour; i++) {
      if (i >= startHour) {
        datas.push(Math.random() * (vMax - vMin) + vMin);
        datas2.push(Math.random() * (vMax - vMin) + vMin);
      } else {
        datas.push(null);
        datas2.push(null);
      }
    }

    // コンポーネントのサイズ
    const marginTop = 25;
    const containerHeight = this.#window.height - marginTop;
    const containerWidth = this.#window.width * 0.9;

    // グラフの最大値、最小値
    const yMax = 7;
    const yMin = -7;

    // 目標値
    const targetMin = -2;
    const targetMax = 2;

    // 閾値
    const thValue = 5;

    // 設定した年月のグラフを作成する
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;

    return (
      <ADLLineChartMonth
        width={containerWidth}
        height={containerHeight}
        datas={{
          value1: datas, // 麻痺手
          value2: datas2, // 非麻痺手
        }}
        dayDate={{
          year: year,
          month: month,
        }}
        yMax={yMax}
        yMin={yMin}
        targetMin={targetMin}
        targetMax={targetMax}
        thValue={thValue}
        sleepHourProps={_config.sampleDatas.sleepHourProps}
        alertHourProps={_config.sampleDatas.alertHourProps}
        iconImageProps={_config.sampleDatas.iconImageProps}
        alertLineProps={_config.sampleDatas.alertLineProps}
        currentHourProps={_config.sampleDatas.currentHourProps}
      />
    );
  }

  // MALグラフのサンプル
  malChartDemo() {
    // サンプルデータ
    const startHour = 0; // 開始時間
    const endHour = 12; // 終了時間
    const vMax = 10; // 最大値
    const vMin = 0; // 最小値
    let datas = [];
    let datas2 = [];
    for (let i = startHour; i < endHour; i++) {
      if (i >= startHour) {
        datas.push(Math.random() * (vMax - vMin) + vMin);
        datas2.push(Math.random() * (vMax - vMin) + vMin);
      } else {
        datas.push(null);
        datas2.push(null);
      }
    }

    // コンポーネントのサイズ
    const marginTop = 25;
    const containerHeight = this.#window.height - marginTop;
    const containerWidth = this.#window.width * 0.9;

    // グラフの最大値
    const yMax = 10;

    return (
      <ADLMalChart
        width={containerWidth}
        height={containerHeight}
        datas={{
          value1: datas, // 動作の質
          value2: datas2, // 使用頻度
        }}
        yMax={yMax}
      />
    );
  }
}
