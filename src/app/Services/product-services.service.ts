import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductServicesService {

  seachByCategory:string = ''
  count = new BehaviorSubject(null)

  constructor(private http:HttpClient) { }

  getAllProducts(){
    return this.http.get(environment.baseURL+'api/v1/products');
  }

  getProductById(id:string):Observable<any>
  {
    return this.http.get(environment.baseURL+'api/v1/products/'+id);
  }

  getAllCategories(){
    return this.http.get(environment.baseURL+'api/v1/categories');
  }

  getAllbrands(){
    return this.http.get(environment.baseURL+'api/v1/brands');
  }
}
