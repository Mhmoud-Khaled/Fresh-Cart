import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductServicesService } from 'src/app/Services/product-services.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {

  categories:any = []

  constructor(private productServicse:ProductServicesService, private router:Router){

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

  getcategoryName(name:string){
    this.productServicse.seachByCategory = name.toLowerCase()
    this.router.navigate(['/products'])
  }

}
