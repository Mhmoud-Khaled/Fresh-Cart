import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/Services/auth-services.service';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-navebar',
  templateUrl: './navebar.component.html',
  styleUrls: ['./navebar.component.css']
})
export class NavebarComponent implements OnInit, OnChanges{
  login:boolean = false
  id:any[] = []
  count:any = 0

  constructor(private auth:AuthServicesService,private router:Router, private productServices:ProductServicesService){
    this.auth.userData.subscribe({
      next: () => {
        if(this.auth.userData.getValue() != null){
          this.login = true;
        }else{
          this.login = false;
        }
      }
    })


    this.productServices.count.subscribe({
      next:()=>{
        if(this.productServices.count.getValue() != null){
          this.count = this.productServices.count.getValue()
        }else{
          if('id' in localStorage){
            this.id = JSON.parse(localStorage.getItem('id')!);
            for(let item of this.id){
              this.count++;
            }
          }
        }
      }
    })

  }



  ngOnChanges(): void {

  }



  ngOnInit(): void {

  }


  logout(){
    this.auth.userData.next(null);
    this.productServices.count.next(null);
    this.count = 0
    this.router.navigate(['/login'])
    localStorage.clear()
  }

}
