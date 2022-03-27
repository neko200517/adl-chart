import React from 'react';
import {View} from 'react-native';
import {BarChart} from 'react-native-svg-charts';
import {Gradient} from '..';
import ADLChart_Base from '../adl-chart-base';

/**
 * 棒グラフ
 */
class ADLBarChart extends ADLChart_Base {
  // 左右のデータをそれぞれ生成する
  createDatas() {
    const dayOfHour = this.getDayOfHour();
    const dayOfHourSplitValue = this.props.dayOfHourSplitValue;
    const values1 = this.props.datas.value1;
    const values2 = this.props.datas.value2;

    let datas1 = [];
    let datas2 = [];
    for (let i = 0; i < dayOfHour * dayOfHourSplitValue; i++) {
      let data = 0;
      let data2 = 0;
      if (i < values1.length) {
        const v = values1[i] ? values1[i] : 0;
        data = {label: '', value: v};
      } else {
        data = {label: '', value: 0};
      }
      if (i < values2.length) {
        const v = values2[i] ? values2[i] : 0;
        data2 = {label: '', value: v};
      } else {
        data2 = {label: '', value: 0};
      }
      datas1.push(data);
      datas2.push(data2);
    }
    return {value1: datas1, value2: datas2}; // value1: 左手, value2: 右手
  }

  getContainerMainView() {
    const datas = this.createDatas();
    const iconImageViews = this.createIconViews();
    return (
      <View // container_main_charts_wrapper
        style={this.styles.container.main.chart.$}>
        <BarChart // container_main_charts_left
          style={{
            flex: 1,
            top: 0,
            marginLeft: 0,
            transform: [{scaleX: -1}],
            height: '100%',
          }}
          data={datas.value1}
          yMin={0}
          yMax={this.props.yMax}
          horizontal={true}
          yAccessor={({item}) => item.value}
          svg={{
            fill: this.props.barChartColor1,
          }}
          contentInset={{top: 0, bottom: 0}}
          spacingInner={this.props.spacingInner}>
          <Gradient />
        </BarChart>
        <View // container_main_charts_middle
          style={this.styles.container.main.chart.middle.$}>
          {iconImageViews}
        </View>
        <BarChart // contaier_main_charts_right
          style={{
            flex: 1,
            marginRight: 0,
            top: 0,
            height: '100%',
          }}
          data={datas.value2}
          yMin={0}
          yMax={this.props.yMax}
          horizontal={true}
          yAccessor={({item}) => item.value}
          svg={{
            fill: this.props.barChartColor2,
          }}
          contentInset={{top: 0, bottom: 0}}
          spacingInner={this.props.spacingInner}>
          <Gradient />
        </BarChart>
      </View>
    );
  }
}

export default ADLBarChart;
