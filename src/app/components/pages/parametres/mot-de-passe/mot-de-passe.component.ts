import { Component } from '@angular/core';
import { ParametresComponent } from '../parametres.component';
import { UserService } from '../../../../services/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mot-de-passe',
  standalone: true,
  imports: [],
  templateUrl: './mot-de-passe.component.html',
  styleUrl: './mot-de-passe.component.css'
})
export class MotDePasseComponent {
  modifyPasswordForm = new FormGroup({
    field: new FormControl("",[]),
    confirm: new FormControl("",[])
  }, confirmPassword);

  txtErrorPassword: string = "";

  constructor(private userService:UserService){ }

  submit(){
    console.log(this.modifyPasswordForm);
    
  }

  modifyPassword(actualPassword: string, newPassword: string, confirmPassword: string){
    if(newPassword. !== confirmPassword){
        this.txtErrorPassword = "Les mots de passe ne correspondent pas.";
    }
  }
}
