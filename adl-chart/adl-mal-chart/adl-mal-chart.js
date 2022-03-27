import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {BarChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import ADLChart_Base from '../adl-chart-base';
import {Gradient} from '..';
import Svg from 'react-native-svg';
import {Rect} from 'react-native-svg';

/**
 * 折れ線グラフ
 */
class ADLMalChart extends ADLChart_Base {
  getDayOfHour() {
    return 12;
  }
  getStartHour() {
    return 1;
  }
  getHourUnit() {
    return '月';
  }
  getChartsWrapperPadding() {
    return -1;
  }
  // defaultPropsの上書き
  getDefaultMarginTop() {
    return 40;
  }
  getDefaultSpacingInner() {
    return 0.4;
  }

  // ビューの取得
  getView() {
    const texts = this.createHourTexts();

    const textAreaWidth = this.props.malHeaderTextAreaWidth;
    const textAreaHeight = this.props.malHeaderTextAreaHeight;
    const borderRadius = this.props.malHeaderTextAreaBorderRadius;
    const fontSize = this.props.malHeaderTextFontSize;

    const textAreaBackgroundColor1 =
      this.props.malHeaderTextAreaBackgroundColor1;
    const textAreaColor1 = this.props.malHeaderTextAreaColor1;
    const textAreaText1 = this.props.malHeaderTextAreaText1;

    const textAreaBackgroundColor2 =
      this.props.malHeaderTextAreaBackgroundColor2;
    const textAreaColor2 = this.props.malHeaderTextAreaColor2;
    const textAreaText2 = this.props.malHeaderTextAreaText2;

    const style = StyleSheet.create({
      text: {
        textAlign: 'center',
        lineHeight: textAreaHeight,
      },
    });

    return (
      <View // container
        style={this.styles.container.$}>
        <View // container_header
          style={this.styles.container.header.$}>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: textAreaBackgroundColor1,
                width: textAreaWidth,
                height: textAreaHeight,
                borderRadius: borderRadius,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: textAreaHeight,
                  fontSize: fontSize,
                  color: textAreaColor1,
                }}>
                {textAreaText1}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: '50%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                backgroundColor: textAreaBackgroundColor2,
                width: textAreaWidth,
                height: textAreaHeight,
                borderRadius: borderRadius,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  lineHeight: textAreaHeight,
                  fontSize: fontSize,
                  color: textAreaColor2,
                }}>
                {textAreaText2}
              </Text>
            </View>
          </View>
        </View>

        <View // container_main
          style={this.styles.container.main.$}>
          <View // container_main_left_wrapper
            style={this.styles.container.main.left.$}>
            {texts}
          </View>

          {this.getContainerMainView()}

          <View // container_main_right_wrapper
            style={this.styles.container.main.right.$}></View>
        </View>

        <View // container_footer
          style={this.styles.container.footer.$}></View>
      </View>
    );
  }

  // 取得したMALデータをグラフ用データに変換
  createDatas() {
    const dayOfHour = this.getDayOfHour();
    const dayOfHourSplitValue = this.props.dayOfHourSplitValue;
    const values1 = this.props.datas.value1;
    const values2 = this.props.datas.value2;
    const chartColor1 = this.props.malChartColor1;
    const chartColor2 = this.props.malChartColor2;

    let datas1 = [];
    let datas2 = [];
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
        const v = values2[i] ? values2[i] : 0;
        data2 = v;
      } else {
        data2 = 0;
      }
      datas1.push(data);
      datas2.push(data2);
    }

    const obj1 = {
      data: datas1,
      svg: {
        fill: chartColor1,
      },
    };
    const obj2 = {
      data: datas2,
      svg: {
        fill: chartColor2,
      },
    };

    return {value1: obj1, value2: obj2}; // value1: 動作の質, value2: 使用頻度
  }

  getMonthView() {
    const datas = this.createDatas();
    const datas1 = datas.value1;
    const datas2 = datas.value2;
    const barData = [datas1, datas2];

    const top = this.props.height / 100;
    const bottom = top;
    const spacingInner = this.getSpacingInner();

    return (
      <BarChart
        style={{
          flex: 1,
        }}
        data={barData}
        yMin={0}
        yMax={this.props.yMax}
        horizontal={true}
        yAccessor={({item}) => item.value}
        contentInset={{top: top, bottom: bottom}}
        spacingInner={spacingInner}>
        <Gradient />
      </BarChart>
    );
  }

  getContainerMainView() {
    return (
      <View // container_main_charts_wrapper
        style={this.styles.container.main.chart.$}>
        <View // container_main_charts
          style={{
            width: '100%',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          {this.getMonthView()}
        </View>
      </View>
    );
  }
}

export default ADLMalChart;
