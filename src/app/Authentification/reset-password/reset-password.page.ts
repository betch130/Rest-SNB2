import { Component, OnInit } from '@angular/core';
import { User } from 'src/Classes/Classes';
import { AuthService } from 'src/Services/auth.service';
import { GlobalService } from 'src/Services/global.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  user={
    UserId:"",
    UserName:'betch',
    Email:'',
    Password:'123456',
    NewPassword:''
  }
  btn=true;
  users=[]
  secret;
  UserMod=new User();
  constructor(private auth:AuthService,private glo:GlobalService) 
  {
   }

  ngOnInit() {
  }


  verification()
  {
    if(this.user.Email!='' || !this.user.Email.includes('@'))
    {
      this.btn=true
    }
    else{
      this.btn=false;
    }
  }

  reset()
  {
    console.log(this.user);
    
    let matricule;
    this.auth.reset(this.user).subscribe(x=>{
      console.log(x);
      if(x==null)
      {
        alert('Email incorrect');
        return;
      }
      this.user.UserName=x.username;
      this.auth.GesteUser('getOne','',x.userId).subscribe(data=>{
        this.UserMod.affect(data[0]);
        console.log(data[0]);
        matricule=data.matricule;
        this.user.Password=data[0].password;
        this.user.UserId=data[0].userId;
        if(this.UserMod.Secret==this.secret)
        {
          this.auth.modif(this.user).subscribe(x=>{
            console.log(x);
            this.UserMod.Password=this.user.NewPassword;
            this.auth.GesteUser('edit',this.UserMod,this.UserMod.matricule).subscribe(data=>{
             console.log(data);
             alert('identifiant: '+this.user.UserName+"  "+ 'Mot de passe: '+this.user.NewPassword);
             this.glo.CloseModal()
            }) ;
          })
        }
        else
        {
          alert('La phrase secret est incorrect');
        }
      }) ;
    });
  }
}
