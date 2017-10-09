
import { NavController, NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Currency } from './../../model/currency';

@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html'
})
export class CurrencyPage implements OnInit {

  item = new Currency();
  chartData: any;

  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: ''
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    credits: {
      enabled: false
    },
    series: [{
      name: 'Line 1',
      data: [1, 3, 2, 7]
    }, {
      name: 'Line 2',
      data: [2, 1, 5, 2]
    }]
  });

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ngOnInit(): void {
  }

}
