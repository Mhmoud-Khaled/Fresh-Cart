import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { AboutComponent } from './Components/about/about.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { CartComponent } from './Components/cart/cart.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductDetailsComponent } from './Components/product-details/product-details.component';
import { AuthGuard } from './guards/auth.guard';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ProductsComponent } from './Components/products/products.component';

const routes: Routes = [
  { path: '', redirectTo:"login", pathMatch:"full" },
  {path:"home",canActivate:[AuthGuard],component:HomeComponent},
  {path:"about",canActivate:[AuthGuard],component:AboutComponent},
  {path:"brands",canActivate:[AuthGuard],component:BrandsComponent},
  {path:"cart",canActivate:[AuthGuard],component:CartComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"categories",canActivate:[AuthGuard],component:CategoriesComponent},
  {path:"products",canActivate:[AuthGuard],component:ProductsComponent},
  {path:"product/:id",canActivate:[AuthGuard],component:ProductDetailsComponent},
  {path:"**",component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
