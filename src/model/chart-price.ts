export class ChartPrice {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volumefrom: number;
  volumeto: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
