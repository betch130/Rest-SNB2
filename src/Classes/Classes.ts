export class Categorie{
    idCat:any;
    nom:string ;
    Date :string
    DateMod :string
     constructor(param){
        this.idCat=param.id;
        this.nom=param.nom ;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
    }
}


export class Agent{
      Matricule: string ;
      Nom: string ;
      Prenom: string ;
      Sexe: string ;
      DateNaiss: string ;
      LieuNaiss: string ;
      SMatri: string ;
      Nation: string ;
      Ethnie: string ;
      GrpSang: string ;
      Rhesus: string ;
      Langue: string ;
      DateEmbauche: string ;
      NumCNSS: string ;
      DateRetraite: string ;
      DateConfirm: string ;
      DateBaptem: string ;
      NomParain: string ;
      Photo: string ;
      Rue: string ;
      Quartier: string ;
      Bp: string ;
      Ville: string ;
      Tel: string ;
      Email: string ;
      Type:string;
      Date :string
      DateMod :string      
   public   affect(param)
      {
       this.Matricule= param.matricule ;
        this.Nom= param.nom ;
        this.Prenom= param.prenom ;
        this.Sexe= param.sexe ;
        this.DateNaiss= param.dateNaiss ;
        this. LieuNaiss= param.lieuNaiss ;
        this.SMatri= param.sMatri ;
        this.Nation= param.nation ;
        this.Ethnie= param.ethnie ;
        this.GrpSang= param.grpSang ;
        this.Rhesus= param.rhesus ;
        this.DateEmbauche= param.dateEmbauche ;
        this.NumCNSS= param.numCNSS ;
        this.Langue= param.langue ;
        this.DateRetraite= param.dateRetraite ;
        this.DateConfirm= param.dateConfirm ;
        this.DateBaptem= param.dateBaptem ;
        this.NomParain= param.nomParain ;
        this.Photo= param.photo ;
        this.Rue= param.rue ;
        this.Quartier= param.quartier ;
        this.Bp= param.bp ;
        this.Ville= param.ville ;
        this.Tel= param.tel ;
        this.Email= param.email ;
        this.Type=param.type;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
      }
}


export class AttrClasseGrade{
    IdACG:number;
    IdCla:number;
    IdGr:number;
    Designation:string;
    Categorie:string;
    Date :string
    DateMod :string
         public   affect(param){
        this.IdACG=param.idACG;
        this.IdCla= param.idCla ; 
        this.IdGr= param.idGr ;
        this.Designation=param.designation;
        this.Categorie=param.categorie
        this.Date=param.date;
        this.DateMod=param.dateMod ;
        }
}

export class AttrEchelon{
    IdAEch:number;
    matricule:string;
    DateFnEch:string;
    DateDebEch:string;
    Date :string
    DateMod :string
        Duree:number;
    IdEch:number;
     public   affect(param){
        this.IdAEch=param.idAEch;
        this.matricule= param.matriculee ; 
        this.DateFnEch= param.dateFnEch ;
        this.DateDebEch=param.dateDebEch;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
        this.Duree=Number(param.duree);
        this.IdEch=Number(param.idEch);
    }
}

export class AttriSaction{
    IdASA:number;
    matricule:string;
    DateDebSanc:string;
    DateFnSanc:string;
    IdS:number ;
    Date :string
    DateMod :string
         public   affect(param){
        this.IdASA=param.idASA;
        this.matricule= param.matriculee ; 
        this.DateFnSanc= param.dateFnSanc ;
        this.DateDebSanc=param.dateDebSanc;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
        this.IdS=param.idS;
    }
}

export class AtttrStatut{
    IdASt:number;
    matricule:string;
    DateDebStat:string;
    DateFnStat:string;
    IdSt:string ;
    Date :string
    DateMod :string
         public   affect(param){
        this.IdASt=param.idASt;
        this.matricule= param.matriculee ; 
        this.DateFnStat= param.dateFnStat ;
        this.DateDebStat=param.dateDebStat;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
        this.IdSt=param.idSt;
    }
}

export class Classe{
    IdCla:number;
    nom:string ;
    Date :string
    DateMod :string
     public   affect(param){
        this.IdCla=param.id;
        this.nom=param.nom ;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
    }
}

export class Echelon{
    IdEch:number;
    Designation:string ;
    Indice:number;
    SalaireBase:number ;
    IdACG:number;
    Date :string
    DateMod :string
     public   affect(param){
        this.IdEch=param.idEch;
        this.Designation=param.designation ;
        this.Indice=param.indice;
        this.SalaireBase=param.salaireBase ;
        this.IdACG=param.idACG;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
    }
}


export class Grade{
    IdGr:number;
    Nom:string ;
    IdCat:number;
    Date :string
    DateMod :string
        public   affect(param){
        this.IdGr=param.idGr;
        this.Nom=param.nom ;
        this.IdCat=param.idCat;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
    }
}

export class Journal{
    Id :number
    IdJ:number
    matricule :string
    Nom :string
    Device :string
    Data :string
    DateConnection :string
    DateDeconnection :string

     public   affect(param){
        this.IdJ =param.IdJ,
        this.Id =param.Id,
        this.matricule =param.matricule,
        this.Nom =param.Nom,
        this.Device =param.Device,
        this.Data =param.Data,
        this.DateConnection =param.DateConnection,
        this.DateDeconnection =param.DateDeconnection
    }
}

export class Statut{
    IdSt:number;
    Libelle:string ;
    Date :string
    DateMod :string
     public   affect(param){
        this.IdSt=param.idSt;
        this.Libelle=param.libelle ;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
    }
}

export class TypeSanction{
    IdS:number;
    Nom:string ;
    Date :string
    DateMod :string
     public   affect(param){
        this.IdS=param.idS;
        this.Nom=param.nom ;
        this.Date=param.date;
        this.DateMod=param.dateMod ;
    }

    

}


export class User{
    matricule :string
    UserName :string
    Email :string
    Password :string
    Droit :string
    Secret :string
    Date :string
    DateMod :string
    UserId :string

     public   affect(param){
        
        this.matricule =param.matricule
        this.UserName =param.userName
        this.Email =param.email
        this.Password =param.password
        this.Droit =param.droit
        this.Secret =param.secret
        this.Date =param.date
        this.DateMod =param.dateMod
        this.UserId =param.userId
    }
}