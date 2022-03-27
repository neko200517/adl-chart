import ADLBarChart from './adl-bar-chart';

class ADLBarChartMonth extends ADLBarChart {
  getDayOfHour() {
    const year = this.props.dayDate.year;
    const month = this.props.dayDate.month;
    return new Date(year, month, 0).getDate();
  }
  getStartHour() {
    return 1;
  }
  getHourUnit() {
    return '日';
  }
  getChartsWrapperPadding() {
    return -1;
  }
}

export default ADLBarChartMonth;
