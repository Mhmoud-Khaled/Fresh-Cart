import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-gategory-slider',
  templateUrl: './gategory-slider.component.html',
  styleUrls: ['./gategory-slider.component.css']
})
export class GategorySliderComponent implements OnInit{

  categories:any = []

  constructor(private productServicse:ProductServicesService){

  }
  ngOnInit(): void {
    this.getAllCategories()
  }

  getAllCategories(){
    this.productServicse.getAllCategories().subscribe((res:any)=>{
      this.categories = res.data;
      console.log("categories")
      console.log(this.categories)
    });
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 7
      },
    },
    nav: true
  }
}
