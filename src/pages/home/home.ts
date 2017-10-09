
import { CurrencyPage } from './../currency/currency';
import { Currency } from './../../model/currency';
import { MarketCap } from './../../model/market-cap';
import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from './../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  doSearch: boolean = false;
  isLoading: boolean = false;
  marketCap: MarketCap;
  currencies: Currency[];
  searchedCurrencies: Currency[];

  constructor(
    public navCtrl: NavController,
    private dataService: DataServiceProvider) {
    this.marketCap = new MarketCap();
  }

  getGlobalMarketCap() {
    this.dataService
      .getGlobalMarketCap()
      .subscribe((data) => {
        this.marketCap = data;
      });
  }

  getCurrencies() {
    this.isLoading = true;
    this.dataService
      .getCurrencies()
      .subscribe((data) => {
        this.currencies = data;
        this.searchedCurrencies = data;
        this.isLoading = false;
      });
  }

  refreshData() {
    this.getGlobalMarketCap();
    this.getCurrencies();
  }

  ngOnInit(): void {
    this.refreshData();
  }

  itemTapped(event, item) {
    this.navCtrl.push(CurrencyPage, {
      item: item
    });
  }

  toggleSearch() {
    this.doSearch = !this.doSearch;
  }

  onCancelSearch(event) {
    this.doSearch = false;
    this.searchedCurrencies = this.currencies;
  }

  searchInputChanged(event) {
    this.searchedCurrencies = this.currencies;

    let val = event.target.value;

    if (val && val.trim() !== '') {
      this.searchedCurrencies = this.searchedCurrencies.filter(function (item) {
        return item.name.toLowerCase().includes(val.toLowerCase());
      });
    }
  }

}
