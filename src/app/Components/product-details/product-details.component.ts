import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductServicesService } from 'src/app/Services/product-services.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  productID:string = ''
  productDetails:any= []

  constructor(private _ActivatedRoute: ActivatedRoute, private productServices:ProductServicesService){

  }

  ngOnInit(): void {
    this.getid()
  }

  getid(){
    this._ActivatedRoute.params.subscribe((res:any)=>{
      this.productID = res.id;
      this.getProductDetails(this.productID)
    })
  }

  getProductDetails(id:string){
    this.productServices.getProductById(id).subscribe({
      next: (res:any)=>{
        this.productDetails = res.data;
        console.log(this.productDetails)
        console.log("get product done")
      },
      error: (err:any)=>{
        console.log("error getting product")
      },
      complete: ()=>{
        console.log("complete getting product")
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true
  }

}
