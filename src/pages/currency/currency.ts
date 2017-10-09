import { DataServiceProvider } from './../../providers/data-service/data-service';

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
  chart: Object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataService: DataServiceProvider) {
    this.item = navParams.get('item');
  }

  ngOnInit(): void {
    this.dataService.getCurrencyChartData(this.item.symbol).subscribe((data) => {

      const chartArray = data.map(item => {
        return {
          x: item.time,
          y: item.close
        };
      });

      this.chart = new Chart({
        chart: {
          zoomType: 'x'
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: ''
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1
              },
              // stops: [
              //   [0, Highcharts.getOptions().colors[0]],
              //   [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
              // ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        series: [{
          type: 'area',
          name: this.item.name,
          data: chartArray
        }]
      });

    });
  }
}
