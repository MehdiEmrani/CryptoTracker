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
          zoomType: 'x',
          panning: true,
          panKey: 'shift'
        },
        title: {
          text: document.ontouchstart === undefined ?
            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        subtitle: {
          text: document.ontouchstart === undefined ?
            'Hold shift key and pan the plot area to move in time' : 'pan the plot area to move in time'
        },
        xAxis: {
          type: 'datetime'
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            format: '{value:.,0f}'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          area: {
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            //threshold: null,
            turboThreshold: 5000
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
