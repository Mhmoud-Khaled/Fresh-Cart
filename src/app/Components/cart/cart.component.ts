import { Component, OnInit } from '@angular/core';
import { observable } from 'rxjs';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  productid:any[] = []
  allProducts:any = []
  cart:any[] = []
  count:number = 1

  constructor(private productServices:ProductServicesService){

  }

  ngOnInit(): void {
    this.getAllProducts()
  }


  getcart(){
    this.cart = []
    if('id' in localStorage){
      this.productid = JSON.parse(localStorage.getItem('id')!);
      for(let item of this.allProducts){
        for(let id of this.productid){
          if(item.id == id){
            // console.log("found")
            this.cart.push(item)
          }
        }
      }
    }
  }



  getAllProducts(){
    this.productServices.getAllProducts().subscribe((res:any)=>{
      this.allProducts = res.data;
      console.log("this.allProducts")
      this.getcart()
    })
  }

  add(){
    this.count += 1
  }

  min(){
    this.count -= 1
  }

  remove(id:string){

    for(let item of this.productid){
      if(item == id){
        this.productid.splice(this.productid.indexOf(item),1)
        localStorage.setItem('id',JSON.stringify(this.productid))
      }
    }
    let cartCount:any = this.productid.length
    this.productServices.count.next(cartCount)
    this.getAllProducts()
  }

  clear(){
    this.productid = []
    localStorage.removeItem('id')
    let cartCount:any = 0
    this.productServices.count.next(cartCount)
    this.getAllProducts()
  }

}
