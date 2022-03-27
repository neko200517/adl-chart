import ADLLineChart from './adl-line-chart';

class ADLLineChartMonth extends ADLLineChart {
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

export default ADLLineChartMonth;
