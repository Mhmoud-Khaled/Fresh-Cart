import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  allProducts:any = []
  spinner:boolean = true
  specificProduct:any
  cartProduct:any [] = []
  cartNumber:any = 0

  constructor(private productServices:ProductServicesService, private router:Router, private toster:ToastrService){

  }
  searchItem:string = this.productServices.seachByCategory



  ngOnInit(): void {
    this.getProducts()
  }

  getProducts()
  {
    this.productServices.getAllProducts().subscribe((res:any)=>{
      this.allProducts = res.data;
      console.log(this.allProducts)
      this.spinner = false
    })
  }


  getSpecificProduct(id:string){
    this.router.navigate(['product/'+id])
  }

  addToCard(id:string){
    //if local storage not emety
    if('id' in localStorage){
      this.cartProduct = (JSON.parse(localStorage.getItem('id')!))

      //check if id is repeated
      let cart = this.cartProduct.find(ele=>{
        if(ele == id){
          return true
        }else{
          return false
        }
      })

      if(cart){ // found
        this.toster.error("Product Already Exists" , "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:1500,
          closeButton: true,
        })
      }else{
        this.cartProduct.push(id)
        localStorage.setItem('id',JSON.stringify(this.cartProduct))
        this.toster.success("Product added success" , "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:1500,
          closeButton: true,
        })
      }
    }else{  // local storage is empty
      this.cartProduct.push(id)
      localStorage.setItem('id',JSON.stringify(this.cartProduct))
      this.toster.success("Product added success" , "" , {
        disableTimeOut: false,
        titleClass: "toastr_title",
        messageClass: "toastr_message",
        timeOut:1500,
        closeButton: true,
      })
    }
    this.count()
  }

  count(){
    this.cartNumber = 0
    for(let item of this.cartProduct){
      this.cartNumber++
    }
      this.productServices.count.next(this.cartNumber)
      console.log(this.productServices.count)
      console.log(this.cartNumber)
  }

}
