import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import {EquationModel} from "../models/equation.model";

@Injectable({
  providedIn: 'root'
})
export class SolverService {

  private url: string
  private thyHeaders

  constructor(private http: HttpClient) {
    this.url = 'https://peaceful-ravine-97977.herokuapp.com/'
    this.thyHeaders = new HttpHeaders().set('Content-Type', 'application-json')
  }

  getSolution(equation: EquationModel): Observable<any> {
    const params = JSON.stringify(equation)
    console.log(params)
    return this.http.post(this.url + 'solver', params, { headers: this.thyHeaders })
  }
}
