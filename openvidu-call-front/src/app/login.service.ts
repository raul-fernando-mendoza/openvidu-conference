import { resolveSanitizationFn } from '@angular/compiler/src/render3/view/template';
import { Injectable } from '@angular/core';
import { NetworkService } from './shared/services/network/network.service';
class User{
  userId:string
  roles:string[]
}

@Injectable({
  providedIn: 'root'
})


export class LoginService {

  constructor(private networkService:NetworkService) { }

  private user:User
  async login(userId:string, password:string){
    const value = await this.networkService.login(userId, password).then(
			data => {
        this.user = new User
				this.user.userId = data["userId"]
        this.user.roles = data["roles"]
        
			},
			error => {
				console.log("error login in" + JSON.stringify(error))
        this.user = undefined
			}

		)
    return this.user
  }

  isAdmin(){
    if(this.user ){
      const found= this.user.roles.find(role => role=="admin")
      if(found)
        return true
    }
  }

  getUser(){
    return this.user;
  }
}
