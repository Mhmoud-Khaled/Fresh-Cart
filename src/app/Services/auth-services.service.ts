import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  userData = new BehaviorSubject(null)

  constructor(private http:HttpClient) {
    if(localStorage.getItem('userToken') !== null){
      this.deCodedUserData()
    }
  }

  deCodedUserData(){
    let endecodedToken = JSON.stringify(localStorage.getItem("userToken"))
    let decodedToken:any = jwt_decode(endecodedToken)
    this.userData.next(decodedToken)
    // console.log(this.userData)
  }

  signup(model:any):Observable<any>
  {
    return this.http.post(environment.baseURL+'api/v1/auth/signup', model)
  }

  getAllUser():Observable<any>
  {
    return this.http.get(environment.baseURL+'api/v1/users')
  }

  login(model:object):Observable<any>{
    return this.http.post(environment.baseURL+'api/v1/auth/signin',model)
  }

}
