import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as shape from 'd3-shape';
import SleepHourRect from './adl-utility/sleep-hour-rect';
import AlertHourRect from './adl-utility/alert-hour-rect';
import AlertLine from './adl-utility/alert-line';
import CurrentHourLine from './adl-utility/current-hour-line';
import IconImage from './adl-utility/icon-image';

/**
 * グラフの基底クラス
 */
class ADLChart_Base extends React.PureComponent {
  // オーバーライド用
  getDayOfHour() {}
  getStartHour() {}
  getHourUnit() {}
  getChartsWrapperPadding() {}
  getContainerMainView() {}
  createDatas() {}

  // defaultPropsの上書き
  getDefaultMarginTop() {
    return 25;
  }
  getDefaultSpacingInner() {
    return 0.05;
  }
  getMarginTop() {
    return this.props.marginTop
      ? this.props.marginTop
      : this.getDefaultMarginTop();
  }
  getSpacingInner() {
    return this.props.spacingInner
      ? this.props.spacingInner
      : this.getDefaultSpacingInner();
  }

  // 時間テキストの生成
  createHourTexts() {
    let texts = [];
    for (let i = 0; i < this.getDayOfHour(); i++) {
      texts.push(
        <Text
          style={{
            textAlign: 'center',
            width: this.props.marginX,
            fontSize: this.props.fontSize,
          }}>
          {i + this.getStartHour()}
          {this.getHourUnit()}
        </Text>,
      );
    }
    return texts;
  }

  // 現時刻バーの位置
  createCurrentHourLineViews() {
    const color = this.props.currentHourColor;
    const props = this.props.currentHourProps;
    let list = [];
    props.forEach(x => {
      const rect = new CurrentHourLine(x, color, this.getCommonProps());
      list.push(rect.getView());
    });
    return list;
  }

  // アラートバーの位置
  createAlertLineViews() {
    const color = this.props.alertLineColor;
    const props = this.props.alertLineProps;
    let list = [];
    props.forEach(x => {
      const rect = new AlertLine(x, color, this.getCommonProps());
      list.push(rect.getView());
    });
    return list;
  }

  // アイコンの描画
  createIconViews() {
    const iconProps = this.getIconProps();
    const chartHeight = iconProps.chartHeight;
    const iconMarginY = iconProps.iconMarginY;
    const rowTop = iconProps.rowTop;
    const startHour = iconProps.startHour;

    const iconScale = this.props.iconScale;
    const iconHeight =
      chartHeight * iconScale < this.props.iconAreaWidth
        ? chartHeight * iconScale
        : this.props.iconAreaWidth;
    const iconWidth = iconHeight;

    const props = this.props.iconImageProps;
    let iconImageSystemProps = {
      areaWidth: this.props.iconAreaWidth,
      height: iconHeight,
      width: iconWidth,
      chartHeight: chartHeight,
      rowTop: rowTop,
      startHour: startHour,
      iconMarginY: iconMarginY,
      zIndex: 1,
    };

    let list = [];
    props.forEach(prop => {
      const icon = new IconImage(prop, iconImageSystemProps);
      iconImageSystemProps.zIndex += 1;
      list.push(icon.getView());
    });
    return list;
  }

  // アラートあり判定された期間
  createAlertHourViews() {
    const color = this.props.alertHourColor;
    const props = this.props.alertHourProps;
    let list = [];
    props.forEach(prop => {
      const rect = new AlertHourRect(prop, color, this.getCommonProps());
      list.push(rect.getView());
    });
    return list;
  }

  // 活動時間外期間
  createSleepHourViews() {
    const color = this.props.sleepHourColor;
    const props = this.props.sleepHourProps;
    let list = [];
    props.forEach(prop => {
      const rect = new SleepHourRect(prop, color, this.getCommonProps());
      list.push(rect.getView());
    });
    return list;
  }

  // 共通設定の取得
  getCommonProps() {
    // 共通設定
    return {
      rowTop: this.getRowTop(),
      dayOfHour: this.getDayOfHour(),
      startHour: this.getStartHour(),
    };
  }

  // アイコン用設定の取得
  getIconProps() {
    return {
      rowTop: this.getRowTop(),
      startHour: this.getStartHour(),
      chartHeight: this.getChartHeight(),
      iconMarginY: this.getIconMarginY(),
    };
  }

  // 棒グラフ1メモリ分の位置を取得
  getRowTop() {
    const hight =
      this.props.height - this.getMarginTop() - this.props.marginBottom;
    return hight / this.getDayOfHour() - this.getSpacingInner();
  }

  // 一つの棒グラフの高さ
  getChartHeight() {
    const hight =
      this.props.height - this.getMarginTop() - this.props.marginBottom;
    return hight * 0.038489;
  }

  // アイコンのy座標の余白
  getIconMarginY() {
    return this.getChartsWrapperPadding() - 0.5;
  }

  // 描画
  render() {
    // スタイルの設定
    this.setStyles();

    // 描画
    return this.getView();
  }

  // スタイルの設定
  setStyles() {
    this.styles = StyleSheet.create({
      container: {
        $: {
          maxHeight: this.props.height,
          width: this.props.width,
          flex: 1,
          flexDirection: 'column',
        },
        header: {
          $: {
            backgroundColor: this.props.backgroundColor,
            maxHeight: this.getMarginTop(),
            maxWidth: this.props.width,
            flex: 1,
            flexDirection: 'row',
          },
          left: {
            $: {
              width: this.props.marginX,
            },
            text: {
              $: {
                fontSize: this.props.fontSize,
                top: 5,
                left: 15,
              },
            },
          },
          middle: {
            $: {
              width: this.props.width - this.props.marginX * 2,
            },
          },
          right: {
            $: {
              width: this.props.marginX,
              alignItems: 'flex-end',
            },
            text: {
              $: {
                fontSize: this.props.fontSize,
                top: 5,
                left: -15,
              },
            },
          },
        },
        main: {
          $: {
            backgroundColor: this.props.backgroundColor,
            height: '100%',
            maxWidth: this.props.width,
            flex: 1,
            flexDirection: 'row',
          },
          left: {
            $: {
              width: this.props.marginX,
              height: '100%',
              justifyContent: 'space-around',
            },
            text: {},
          },
          chart: {
            $: {
              flex: 1,
              flexDirection: 'row',
              height: '100%',
            },
            middle: {
              $: {
                width: this.props.iconAreaWidth,
              },
            },
          },
          right: {
            $: {
              width: this.props.marginX,
              height: '100%',
              justifyContent: 'space-around',
            },
            text: {},
          },
        },
        footer: {
          $: {
            backgroundColor: this.props.backgroundColor,
            height: this.props.marginBottom,
            width: this.props.width,
          },
        },
      },
    });
  }

  // ビューの取得
  getView() {
    const texts = this.createHourTexts();
    const headerText1 = this.props.headerText1;
    const headerText2 = this.props.headerText2;
    return (
      <View // container
        style={this.styles.container.$}>
        <View // container_header
          style={this.styles.container.header.$}>
          <View // container_header_left_wrapper
            style={this.styles.container.header.left.$}>
            <Text style={this.styles.container.header.left.text.$}>
              {headerText1}
            </Text>
          </View>

          <View // container_header_middle_wrapper
            style={this.styles.container.header.middle.$}
          />

          <View // container_header_right_wrapper
            style={this.styles.container.header.right.$}>
            <Text style={this.styles.container.header.right.text.$}>
              {headerText2}
            </Text>
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
            style={this.styles.container.main.right.$}>
            {texts}
          </View>

          {/* 範囲_活動時間外の期間 */}
          {this.createSleepHourViews()}

          {/* 範囲_アラートあり判定された期間 */}
          {this.createAlertHourViews()}

          {/* ライン_アラート通知されたタイミング */}
          {this.createAlertLineViews()}

          {/* ライン_現在の時刻 */}
          {this.createCurrentHourLineViews()}
        </View>

        <View // container_header
          style={this.styles.container.footer.$}></View>
      </View>
    );
  }
}

// デフォルト設定
ADLChart_Base.defaultProps = {
  //*********************************************************
  // 共通
  //*********************************************************
  // 共通スタイル
  width: 411, // 幅
  height: 731, // 高さ
  backgroundColor: '#fff', // 背景色
  fontSize: 10, // フォントサイズ
  // marginTop: 25, // 上の余白
  marginBottom: 12.5, // 下の余白
  marginX: 40, // 左右の余白

  // データ
  datas: {
    value1: [], // 左手
    value2: [], // 右手
  },

  // 月タイプのチャートに有効。※設定した月の最大日数を算出するため。
  dayDate: {
    year: new Date().getFullYear(), // 年
    month: new Date().getMonth() + 1, // 月
  },

  // チャートをn分割する。
  // 例）時間タイプのチャートで2にすると30分単位でチャートを生成する。
  dayOfHourSplitValue: 1,

  // チャートの隙間
  // spacingInner: 0.05,

  // チャートの最大値
  yMax: 0,

  // 活動時間外の背景色
  sleepHourColor: 'rgba(0, 10, 100, 0.4)',

  // アラート期間の背景色
  alertHourColor: 'rgba(240, 0, 0, 0.25)',

  // アラートラインの背景色
  alertLineColor: '#f55',

  // 現時刻ラインの背景色
  currentHourColor: '#55f',

  // アイコン表示部の余白
  iconAreaWidth: 40,

  // アイコンの拡大率
  iconScale: 1.15,

  // 時間指定
  sleepHourProps: [],
  alertHourProps: [],
  iconImageProps: [],
  alertLineProps: [],
  currentHourProps: [],

  // ヘッダの文字列
  headerText1: '左手',
  headerText2: '右手',

  // 線型補完
  curveFunction: shape.curveBasis,

  //*********************************************************
  // ○ 活動量グラフ
  //*********************************************************
  // 棒グラフの色
  barChartColor1: 'url(#True_Sunset)', // 左手
  barChartColor2: 'url(#Malibu_Beach)', // 右手

  //*********************************************************
  // ○ バランスグラフ
  //*********************************************************
  // 折れ線グラフのスタイル
  lineChartWidth: 200, // 幅
  lineChartColor: 'url(#default)', // 色

  // 折れ線グラフの目標値
  targetMin: 0, // 最小値
  targetMax: 0, // 最大値
  targetColor: '#9cf', // 背景色

  // 折れ線グラフの閾値
  thValue: 0, // 閾値
  thColor: '#fcc', // 色

  //*********************************************************
  // ○ MALグラフ
  //*********************************************************
  // 棒グラフの色
  malChartColor1: 'url(#Malibu_Beach)', // 動作の質
  malChartColor2: 'url(#True_Sunset)', // 使用頻度

  // ヘッダのテキスト
  malHeaderTextAreaWidth: 100,
  malHeaderTextAreaHeight: 25,
  malHeaderTextAreaBorderRadius: 5,
  malHeaderTextFontSize: 10,
  malHeaderTextAreaBackgroundColor1: '#38f',
  malHeaderTextAreaColor1: '#fff',
  malHeaderTextAreaText1: '動作の質',
  malHeaderTextAreaBackgroundColor2: '#f94',
  malHeaderTextAreaColor2: '#444',
  malHeaderTextAreaText2: '使用頻度',
};

export default ADLChart_Base;
