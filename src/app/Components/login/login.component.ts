import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServicesService } from 'src/app/Services/auth-services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form:any = new FormControl

  alert:boolean = true
  spinner:boolean = false
  constructor(private fb:FormBuilder, private auth:AuthServicesService, private router:Router){

  }

  ngOnInit(): void {
    this.createFrom()
  }

  createFrom(){
    this.form = this.fb.group({
      email:['', [Validators.required]],
      password:['', [Validators.required]]
    })
  }

  submit(){
    const model = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    console.log(model)
    this.spinner = true
    this.alert = true
    this.auth.login(model).subscribe({
      next: (response) => {
        if(response.message === 'success'){
          localStorage.setItem("userToken",response.token)
          this.router.navigate(['/home'])
          this.alert = true
          this.clearForm()
          this.auth.deCodedUserData()
        }else{
          this.alert = false
          this.spinner = false
        }
      },
      error: (err) => {
        console.log("login Error")
        console.log(err);
        this.spinner = false
        this.alert = false
      }
    })

  }

  clearForm(){
    this.form.reset()
  }

}
