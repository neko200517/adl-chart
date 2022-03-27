import ADLBarChart from './adl-bar-chart';

class ADLBarChartYear extends ADLBarChart {
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

export default ADLBarChartYear;
