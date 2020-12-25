import { Component, OnDestroy, OnInit, ViewChild, HostListener, TemplateRef, ElementRef } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService, NbContextMenuDirective, NbContextMenuModule } from '@nebular/theme';
import * as _ from 'lodash';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { ifError } from 'assert';
import { AlertController } from '@ionic/angular';
import { Journal, User } from 'src/Classes/Classes';
import { GlobalService } from 'src/Services/global.service';
import { AuthService } from 'src/Services/auth.service';


@Component({
  selector: 'app-header-contenu',
  templateUrl: './header-contenu.component.html',
  styleUrls: ['./header-contenu.component.scss'],
})
export class HeaderContenuComponent implements OnInit {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  imageError: string;


  currentTheme = 'default';
  loading_single=false;
  loading=false;
  userMenu = [ { title: 'Profil' }, { title: 'Déconnecter' } ];
userT={
  UserName:'',
  Email:'',
  Password:'',
  NewPassword:'',
  UserId:''
}
user1= new User();
email;verifExist=[];active1=false;password;modif=true;
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  @ViewChild('notifTemplate') notifTemplate: TemplateRef<any>;
  @ViewChild('theme') theme: TemplateRef<any>;
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog: ElementRef;
  public OpenAddFilesDialog() {
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
    
}
localNotifDatas=[]; affiche
NotifDatas=[];nbNotif;
echelons=[]; indices=[];agents=[];agentverifExist=[];
  constructor(
              private sidebarService: NbSidebarService,
              private breakpointService: NbMediaBreakpointsService,
              private glo:GlobalService,
              private app:AppComponent,
              private auth:AuthService,
              private alertCtrl:AlertController
              ) {
           /* glo.getweb('user').then(x=>{
              this.user1.affect(x)
              this.password=x.password;
              
            })   
           this.getAll()*/
           }

  getAll()
  {
    this.auth.GesteUser('getAll').subscribe(datas=>{
      this.verifExist= datas;
    }) ;

    this.auth.GesteEchelon('getAll').subscribe(datas=>{
      this.echelons = datas;
      console.log(this.echelons);
      datas.forEach(e => {
        this.indices.push(e.indice)
      });
      this.indices.sort(function(a,b){
        return a-b;
      })
    }) ;

    this.auth.GesteAttrEchelon('getAll').subscribe(datas=>{
      console.log(datas);
    this.localNotifDatas=datas;
    this.agentverifExist=datas;
    this.auth.GesteAgents('getAll').subscribe(datas=>{
      console.log(datas);
    this.agents=datas;
    this.NotifDatas=[];
    this.Notification()
    })
   
    })
  
  }

  upload(fileInput: any)
  {
    this.imageError = null;
    if (fileInput.target.files && fileInput.target.files[0]) {
        // Size Filter Bytes
        const max_size = 20971520;
        const allowed_types = ['image/png', 'image/jpeg'];
        const max_height = 1520000;
        const max_width = 256000;
  
        if (fileInput.target.files[0].size > max_size) {
            this.imageError =
                'Maximum size allowed is ' + max_size / 1000 + 'Mb';
  
            return false;
        }
  
        if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
            this.imageError = 'Only Images are allowed ( JPG | PNG )';
            return false;
        }
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const image = new Image();
            image.src = e.target.result;
            image.onload = rs => {
                const img_height = rs.currentTarget['height'];
                const img_width = rs.currentTarget['width'];
  
                console.log(img_height, img_width);
  
  
                if (img_height > max_height && img_width > max_width) {
                    this.imageError =
                        'Maximum dimentions allowed ' +
                        max_height +
                        '*' +
                        max_width +
                        'px';
                    return false;
                } else {
                    const imgBase64Path = e.target.result;
                    this.user.picture = imgBase64Path;
                   // this.isImageSaved = true;
                    // this.previewImagePath = imgBase64Path;
                  //  console.log(this.agent.Photo);
                    
                }
            };
        };
  
        reader.readAsDataURL(fileInput.target.files[0]);
    }
   
  }


  ngOnInit() {

 
    
    
    
   
  this.user = { name: localStorage.getItem('name'), picture: localStorage.getItem('picture') };

 
  
   /*   this.menuService.onItemClick().subscribe(( event ) => {
        if(event.item.title=='Profil')
        {
          this.modif=true;
          this.glo.getweb('user').then(x=>{
            this.user1.affect(x)
            this.password=x.password;
            console.log(this.user1);
            
            this.getAll()
          this.pageProfil()})
        }
       if(event.item.title=='Déconnecter')
        { 
          this.app.ActiveOk=false;
          if(window.confirm('Voulez-vous vraiment vous deconnecter?'))
          {
            
          this.logout()
          }
          else
          {
            this.app.ActiveOk=true;
          }
        }

        if(event.item.title=='Notifications')
        { 
         this.showNotifs()
        }
        if(event.item.title=='Thèmes')
        { 
          this.showTheme()
        }
      })*/

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }






  journal=new Journal()

  logout()
  {
    let rel;
    this.journal.affect(JSON.parse(localStorage.getItem("Journal")));
      this.journal.DateDeconnection=this.glo.transformDate(Date.now());

    this.auth.GesteJournal('edit', this.journal,this.journal.IdJ).subscribe(x=>{
    
    })
    .add(x=>{
    localStorage.clear()
   localStorage.setItem('islog','false')
  this.app.islog=false; 
  location.reload()
    });


  }
 
pageProfil()
{
  //this.glo.showModalNb(this.contentTemplate,"Modifier votre profil",'data')
}

verification()
{
 let cmp=false;
 this.verifExist.forEach(x=>{
   if( x.matricule==this.user1.matricule )
 {
   cmp=true;
   console.log(cmp);
   
 }
 if( x.email==this.user1.Email)
 {
   this.email=true;
   console.log(this.email);
   
 }
 })
 return cmp;
}

Edit():void {
let mod=true;


this.verifExist.forEach(x=>{
if( x.email==this.user1.Email && x.matricule!=this.user1.matricule)
{
alert('Email déjà utilisé')
mod=false;
return;
}
})

if(mod)
{
if (window.confirm('Voulez-vous vraiment modifier?')) {
 this.userT.Email=this.user1.Email; 
 this.userT.Password=this.password;
 this.userT.NewPassword=this.user1.Password;
 this.userT.UserName=this.user1.UserName;
 this.userT.UserId=this.user1.UserId;
 this.user1.DateMod=this.glo.transformDateSimple(Date.now())
 console.log(this.userT);
 
this.auth.modif(this.userT).subscribe(data => {
console.log(data);
this.user.UserId=data.userId;
this.auth.GesteUser('edit',this.user1,this.user1.matricule).subscribe(x=>{
//this.glo.showToast('Profil bien modifié');
this.getAll();       
//this.glo.setweb('user',this.affect(this.user1))
});
})

} 
}



}

affect(x)
{
  let  userT={
    matricule:'',
    userName:'',
    email:'',
    password:'',
    droit:'',
    secret:'',
    date:'',
    dateMod:'',
    userId:''
 }

 userT.matricule=x.matricule;
 userT.userName=x.UserName;
 userT.email=x.Email;
 userT.password=x.Password;
 userT.droit=x.Droit;
 userT.secret=x.Secret;
 userT.date=x.Date;
 userT.dateMod=x.DateMod;
 userT.userId=x.UserId;
return userT;
}

Active()
{
  this.modif=false;
  if(

   this.user1.UserName==undefined||
   this.user1.Droit==undefined||
   this.user1.Email==undefined||
   this.user1.Password==undefined||
   this.user1.Secret==undefined    ||
   this.user1.UserName==''||
   this.user1.Droit==''||
   this.user1.Email==''||
   this.user1.Password==''||
   this.user1.Secret==''    
  )
  {
    this.active1=false
  }
  else{
    this.active1=true
  }
console.log(this.active1 );


}



Notification():void {
let indice;

    this.localNotifDatas.forEach(x=>{
      
      let date=new Date(x.dateDebEch);
      date.setMonth(date.getMonth()+x.duree);
    //  alert(this.glo.transformDateSimpleEs( Date.now() ));
      let currentDate= Date.parse(this.glo.transformDateSimpleEs( Date.now() ) )
      if(x.dateFnEch=='-' && Date.parse(date.toString())  <= currentDate )
    {
      console.log(this.indices);
      
   for (let i = 0; i < this.indices.length; i++) {
     const e = this.indices[i];
     if(e==x.indice)
       {
        indice=i
      /// alert(e)
       }
   }

this.echelons.forEach(e=>{
  let nomOld
  if(e.indice == this.indices[indice])
  {
    nomOld=e.designation;
  }
  if(e.indice == this.indices[indice+1])
  {
    
    this.agents.forEach(agent=>{
     // console.log(agent);
      
      if(agent.matricule==x.matricule)
      {
        this.NotifDatas.push({
          matricule:x.matricule,
          nom:x.name,  
          idEch:e.idEch,
          new:e.designation,
          photo:agent.photo
        });
      }
    })

    return
  }

})

 
   }
  });
  if(this.NotifDatas.length <=99)
    this.nbNotif= this.NotifDatas.length
  else
    this.nbNotif=this.NotifDatas.length+'+'
    
  if(this.nbNotif && !this.affiche)
   // this.glo.showToast("Hey,Salut "+this.user.name+" N'oublie pas tu as "+this.nbNotif+" agent(s) qui attend(ent) leur(s) avancement(s)","warning",30000)
  console.log(this.NotifDatas);
     } 



  

    showNotifs()
{
 // this.glo.showModalNb(this.notifTemplate,"Notifications",'data')
}

showTheme()
{
 // this.glo.showModalNb(this.theme,"Changer de thème",'data')
}

}