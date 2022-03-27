import React from 'react';
import {View} from 'react-native';
import {LineChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import ADLChart_Base from '../adl-chart-base';
import {Gradient} from '..';

/**
 * バランスグラフ
 */
class ADLLineChart extends ADLChart_Base {
  // 左右手のデータを元にMR値を生成する
  createDatas() {
    const dayOfHour = this.getDayOfHour();
    const dayOfHourSplitValue = this.props.dayOfHourSplitValue;
    const values1 = this.props.datas.value1;
    const values2 = this.props.datas.value2;
    const min = 0.001;
    const yMax = this.props.yMax;
    const yMin = this.props.yMin;

    let datas = [];
    for (let i = 0; i < dayOfHour * dayOfHourSplitValue; i++) {
      let data = 0;
      let data2 = 0;
      if (i < values1.length) {
        const v = values1[i] ? values1[i] : 0;
        data = v;
      } else {
        data = 0;
      }
      if (i < values2.length) {
        const v = values2[i] ? values2[i] : min;
        data2 = v == 0 ? min : v; // 0除算回避
      } else {
        data2 = min;
      }
      let v = Math.log(data / data2);
      v = v > yMax ? yMax : v;
      v = v < yMin ? yMin : v;
      v = this.props.testValue === undefined ? v : this.props.testValue; // test
      datas.push(v);
    }
    return datas;
  }

  getContainerMainView() {
    const data = this.createDatas();
    const iconImageViews = this.createIconViews();

    const marginX =
      this.props.width / 2 - this.props.iconAreaWidth / 2 - this.props.marginX;

    const contentArea = this.props.width - this.props.marginX * 2;

    // 最小値（グラフの左端）
    // const min = contentArea / 2 - (this.props.lineChartWidth - 20) / 2;

    // 基点
    const ox = contentArea / 2;

    // 目標値の起点と終点
    const targetMin =
      ((this.props.lineChartWidth / this.props.yMax) * this.props.targetMin) /
      2;

    const targetMax =
      ((this.props.lineChartWidth / this.props.yMax) * this.props.targetMax) /
      2;

    // 目標値の幅
    const targetWidth = targetMax - targetMin;

    // 閾値の値
    const thValue =
      ((this.props.lineChartWidth / this.props.yMax) * this.props.thValue) / 2;

    return (
      <View // container_main_charts_wrapper
        style={this.styles.container.main.chart.$}>
        <View // container_main_charts_left
          style={{width: marginX}}
        />
        <View // container_main_charts_middle
          style={this.styles.container.main.chart.middle.$}>
          {iconImageViews}
        </View>
        <View // contaier_main_charts_right
          style={{width: marginX}}
        />

        <View // 目標値
          style={{
            position: 'absolute',
            backgroundColor: this.props.targetColor,
            width: targetWidth,
            height: '100%',
            top: 0,
            left: ox + targetMin,
          }}
        />

        <View // アラート閾値
          style={{
            position: 'absolute',
            backgroundColor: this.props.thColor,
            width: 2,
            height: '100%',
            top: 0,
            left: ox + thValue,
          }}
        />

        <View // アラート閾値
          style={{
            position: 'absolute',
            width:
              this.props.height - this.getMarginTop() - this.props.marginBottom,
            height:
              this.props.height - this.getMarginTop() - this.props.marginBottom,
            top: 0,
            left:
              -367 +
              (40 - this.props.marginX) -
              (200 - this.props.lineChartWidth / 2) +
              (this.props.width - 200) / 2 +
              (this.props.marginBottom - 15) / 2,
            transform: [{rotate: '90deg'}],
          }}>
          <LineChart
            style={{
              width: '100%',
              height: this.props.lineChartWidth,
            }}
            data={data}
            yMin={this.props.yMin}
            yMax={this.props.yMax}
            svg={{
              strokeWidth: 3,
              stroke: this.props.lineChartColor,
            }}
            curve={this.props.curveFunction}>
            <Gradient />
          </LineChart>
        </View>
      </View>
    );
  }
}

export default ADLLineChart;
