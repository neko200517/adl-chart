import ADLBarChart from './adl-bar-chart';

class ADLBarChartDay extends ADLBarChart {
  getDayOfHour() {
    return 24;
  }
  getStartHour() {
    return 0;
  }
  getHourUnit() {
    return '時';
  }
  getChartsWrapperPadding() {
    return 2;
  }
}

export default ADLBarChartDay;
