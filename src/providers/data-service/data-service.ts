import { ChartPrice } from './../../model/chart-price';
import { Currency } from './../../model/currency';
import { MarketCap } from './../../model/market-cap';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class DataServiceProvider {

  constructor(public http: Http) {
  }

  private handleError(error: Response | any) {
    return Observable.throw(error);
  }

  // API: GET /global
  public getGlobalMarketCap(): Observable<MarketCap> {
    return this.http
      .get('/api/global/')
      .map(response => {
        return new MarketCap(response.json());
      })
      .catch(this.handleError);
  }

  // API: GET /ticker
  public getCurrencies(): Observable<Currency[]> {
    return this.http
      .get('/api/ticker/')
      .map(response => {
        const data = response.json();
        return data.map((item) => new Currency(item));
      })
      .catch(this.handleError);
  }

  // API: GET /chart
  public getCurrencyChartData(symbol: string): Observable<ChartPrice[]> {
    return this.http
      .get(`/chartApi/histoday?fsym=${symbol}&tsym=USD&allData=true`)
      .map(response => {
        const data = response.json();
        if (data.Response === 'Success') {
          return data.Data.map((item) => new ChartPrice(item));
        }
        else {
          return Observable.throw(data.Message);
        }
      })
      .catch(this.handleError);
  }

}
