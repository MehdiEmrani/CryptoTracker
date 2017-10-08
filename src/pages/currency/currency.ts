
import { Currency } from './../../model/currency';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-currency',
  templateUrl: 'currency.html'
})
export class CurrencyPage implements OnInit {

  item: Currency = new Currency();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = navParams.get('item');
  }

  ngOnInit(): void {
  }

}
