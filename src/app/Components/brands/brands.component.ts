import { Component, OnInit } from '@angular/core';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit{

  constructor(private productServices: ProductServicesService) {}

  allBrands:any = []

  ngOnInit(): void {
    this.getAllBrands()
  }

  getAllBrands(){
    this.productServices.getAllbrands().subscribe((res:any)=>{
      this.allBrands = res.data;
    })
  }

}
