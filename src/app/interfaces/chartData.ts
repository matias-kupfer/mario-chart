export interface BarVerticalChartData {
  name: string,
  series: any,
}

export interface PieChartData {
  name: string;
  value: number;
  extra: {
    code: string;
  }
}
