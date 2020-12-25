import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, ROUTER_INITIALIZER } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { Journal } from 'src/Classes/Classes';
import { AuthService } from 'src/Services/auth.service';
import { GlobalService } from 'src/Services/global.service';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
/*import { AuthService } from 'src/app/Services/auth.service';
import { GlobalService } from 'src/app/Services/global.service';
import { NbDialogService } from '@nebular/theme';
import { AppComponent } from 'src/app/app.component';
import { StorageService } from 'src/app/Services/storage.service';
import { Journal, User } from 'src/app/Classes/Classes';
*/
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private session = ROUTER_INITIALIZER
  rcpEmail;
  loginForm: FormGroup;
  journal = new Journal();
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
    private glo: GlobalService, private app: AppComponent,
  ) {

    this.loginForm = this.fb.group({
      'username': ['', Validators.compose([
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
        Validators.required
      ])],
      'password': ['', Validators.required]
    })
  }

  ngOnInit() {
  }

  login() {

    if (this.username.value == "" && this.password.value == "") {
      alert('Les champs Usename et Password ne doivent pas être vide')
      return;
    }
    else if (this.username.value == "") {
      alert('Usename est vide')
      return;
    }
    else if (this.password.value == "") {
      alert('Password est vide')
      return;
    }

    this.authService.login(this.loginForm.value).subscribe(data => {
      if (data.error == 'none') {
        this.authService.saveToken(data.token);
        console.log(data);
        localStorage.setItem('islog', 'true');

       // this.app.islog = true;
        this.authService.GesteUser('getOne', '', data.userId).subscribe(x => {
          console.log(x[0]);
         // this.glo.setweb('user', x[0]);
          localStorage.setItem('droit', x[0].droit)
          localStorage.setItem('name', x[0].name)
          if (localStorage.getItem('droit') == 'admin') {
            localStorage.setItem('hidden', JSON.stringify(false))
          }
          else { localStorage.setItem('hidden', JSON.stringify(true)) }
          this.authService.GesteAgents('getOne', '', x[0].matricule).subscribe(y => {
            console.log(y);
         //   this.glo.setweb('agent', y);
            localStorage.setItem('picture', y.photo);
            localStorage.setItem('matricule', y.matricule)

            this.journal.Id = this.getId();
            this.journal.matricule = y.matricule,
              this.journal.Nom = y.nom + "  " + y.prenom
            this.journal.DateConnection = this.glo.transformDate(Date.now());
          //  this.journal.Device = this.getDevice();
            console.log(this.journal);
            this.authService.GesteJournal('add', this.journal).subscribe(x => {
              this.authService.GesteJournal('getOne', ' ', this.journal.Id).subscribe(data => {
                console.log(data[0]);
                this.journal.IdJ = data[0].idJ;
                localStorage.setItem("Journal", JSON.stringify(this.journal))
              });

            });

          });
        });
        this.glo.showPages('dashboard')
      }
      else {
        alert(data.error)
      }

    });
  }

  get username() {
    return this.loginForm.get('username')
  }

  get password() {
    return this.loginForm.get('password')
  }


  openResetPassword() {
    this.glo.showModal(ResetPasswordPage);
  }


 /* getDevice() {
    if (this.app.platform.is('ios')) {
      return "Iphone";
    }
    if (this.app.platform.is('android')) {
      return "Android";
    }
    if (!this.app.platform.is('cordova')) {
      return "Ordinateur";
    }
  }*/

  getId() {
    let string = "";
    let chaine = '0123456789';
    for (let i = 0; i < 7; i++) {
      string = string + chaine.charAt(Math.floor(Math.random() * chaine.length));
    }
    return Number.parseInt(string);
  }


}
