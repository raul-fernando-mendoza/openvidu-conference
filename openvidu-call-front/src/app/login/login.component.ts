import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
		userId: new FormControl(''),
		password: new FormControl(''),
	  });

  error = null
  constructor(private loginService:LoginService,
    private router: Router,) { }

  ngOnInit(): void {
  }

	async onLogin(){
		var userId = this.loginForm.controls.userId.value
		var password = this.loginForm.controls.password.value
		console.log("login", userId, password)
		const user = await this.loginService.login(userId,password)
		console.log( JSON.stringify(user) )

		console.log( "is admin",this.loginService.isAdmin() )

    if( user ){
      this.router.navigate([""])
    }
    else{
      this.error = "There has been an error"
    }
	}  

}
