import ADLLineChart from './adl-line-chart';

class ADLLineChartYear extends ADLLineChart {
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
    return 16;
  }
}

export default ADLLineChartYear;
