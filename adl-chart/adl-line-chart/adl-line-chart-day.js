import {View} from 'react-native';
import ADLLineChart from './adl-line-chart';

class ADLLineChartDay extends ADLLineChart {
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

export default ADLLineChartDay;
