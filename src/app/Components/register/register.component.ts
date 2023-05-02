import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServicesService } from 'src/app/Services/auth-services.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  form:any = new FormControl()
  Alluser:any = []
  found:boolean = true
  spinner:boolean = false

  constructor(private fb:FormBuilder, private router:Router, private auth:AuthServicesService,
              private toaster:ToastrService)
              {

              }


  ngOnInit(): void {
    this.createForm()
    this.loadAllUser()
  }

  createForm(){
    this.form = this.fb.group({
      Name:['',[Validators.required, Validators.maxLength(20)]],
      Email:['',[Validators.required, Validators.email]],
      Password:['', [Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      ConfirmPassword:['',[Validators.required,Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)]],
      Phone: ['', [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")]]
    })
  }

  loadAllUser(){
    this.auth.getAllUser().subscribe({
      next: (data:any) => {
        for(let user in data.users){
          this.Alluser.push(data.users[user].email)
        }
        // console.log(this.Alluser);
      },
      error: (err:any) => {
        console.log("error in loaded users");
      },
      complete(){
        console.log("all user loaded")
      }
    })
  }

  submit(){
    const model = {
      name: this.form.value.Name,
      email: this.form.value.Email,
      password: this.form.value.Password,
      rePassword: this.form.value.ConfirmPassword,
      phone: this.form.value.Phone
    }

    for (let index = 0; index < this.Alluser.length; index++) {
      if (this.Alluser[index] === model.email) {
        this.form.value.Email = "";
        this.toaster.error("Account Already Exists" , "" , {
          disableTimeOut: false,
          titleClass: "toastr_title",
          messageClass: "toastr_message",
          timeOut:3000,
          closeButton: true,
        })
        this.found = true
        break;
      }else{
        this.found = false
      }
    }
    if(!this.found){
    this.spinner = true
    this.auth.signup(model).subscribe({
          next:(response:any)=>{
            if(response.message == 'success'){
              this.toaster.success("Success Register", "" , {
                disableTimeOut: false,
                titleClass: "toastr_title",
                messageClass: "toastr_message",
                timeOut:3000,
                closeButton: true,
              })
              this.clearForm()
              this.router.navigate(['/login']);
            }
          },
          error: (err:any)=>{
            this.spinner = false
            this.form.value.Email = "";
            this.toaster.error(err.error.message, "" , {
              disableTimeOut: false,
              titleClass: "toastr_title",
              messageClass: "toastr_message",
              timeOut:3000,
              closeButton: true,
            })
            console.log("error in signup")
            console.log(err)
          },
          complete: ()=>{
            console.log("register Done")
            this.spinner = false
          }
        })
    }
    // console.log(this.form.value)
  }

  clearForm(){
    this.form.reset()
  }

}
