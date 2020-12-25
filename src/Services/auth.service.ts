import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Agent} from '../Classes/Classes';
import { Platform } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})

  export class AuthService {
    private loginPath = environment.apiUrl + "identity/login";
    private registerPath = environment.apiUrl + "identity/register";
    private resetPath = environment.apiUrl + "identity/reset";
    private modifPath = environment.apiUrl + "identity/modif";
    private deletePath = environment.apiUrl + "identity/delete";
    private categoriePath = environment.apiUrl + "api/categories";
    private AgentPath = environment.apiUrl + "api/agent";
    private ClassePath = environment.apiUrl + "api/classe";
    private GradePath = environment.apiUrl + "api/grade";
    private StatutPath = environment.apiUrl + "api/statut";
    private TypeSanctionPath = environment.apiUrl + "api/typeSanction";
    private EchelonPath = environment.apiUrl + "api/echelon";
    private AttrClasseGradePath = environment.apiUrl + "api/attrClasseGrade";
    private AttrEchelonPath = environment.apiUrl + "api/attrEchelon";
    private AttrSanctionPath = environment.apiUrl + "api/attrSanction";
    private AttrStatutPath = environment.apiUrl + "api/atttrStatut";
    private UserPath = environment.apiUrl + "api/userT";
    private homeagechPath = environment.apiUrl + "home/agentechelon";
    private journalPath = environment.apiUrl + "api/journal";
    homeagechDocPath = environment.apiUrl + "api/DocEchelon";
    homeagstatPath = environment.apiUrl + "api/DocStatut";
    homeagsancDocPath = environment.apiUrl + "api/DocSanction";

    headerLog: HttpHeaders =new HttpHeaders({
      "Content-Type":"application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Max-Age": "1800",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods":"PUT, POST, GET, DELETE, PATCH, OPTIONS",

    })
  public  header: HttpHeaders =new HttpHeaders({
      "Content-Type":"application/json",
      "Authorization":"Bearer "+this.getToken()
    });

  

    constructor(private http: HttpClient,private plt:Platform) 
    {
      if(plt.is("ios") || plt.is("android"))
      {
        this.setWebEnvironement()
      }

     }

     setWebEnvironement()
     {
       console.log('phone');
       
      this.loginPath = environment.apiUrlWeb + "identity/login";
      this.registerPath = environment.apiUrlWeb + "identity/register";
      this.resetPath = environment.apiUrlWeb + "identity/reset";
      this.modifPath = environment.apiUrlWeb + "identity/modif";
      this.deletePath = environment.apiUrlWeb + "identity/delete";
      this.categoriePath = environment.apiUrlWeb + "api/categories";
      this.AgentPath = environment.apiUrlWeb + "api/agent";
      this.ClassePath = environment.apiUrlWeb + "api/classe";
      this.GradePath = environment.apiUrlWeb + "api/grade";
      this.StatutPath = environment.apiUrlWeb + "api/statut";
      this.TypeSanctionPath = environment.apiUrlWeb + "api/typeSanction";
      this.EchelonPath = environment.apiUrlWeb + "api/echelon";
      this.AttrClasseGradePath = environment.apiUrlWeb + "api/attrClasseGrade";
      this.AttrEchelonPath = environment.apiUrlWeb + "api/attrEchelon";
      this.AttrSanctionPath = environment.apiUrlWeb + "api/attrSanction";
      this.AttrStatutPath = environment.apiUrlWeb + "api/atttrStatut";
      this.UserPath = environment.apiUrlWeb + "api/userT";
      this.homeagechPath = environment.apiUrlWeb + "home/agentechelon";
      this.journalPath = environment.apiUrlWeb + "api/journal";
      this.homeagechDocPath = environment.apiUrlWeb + "api/DocEchelon";
      this.homeagstatPath = environment.apiUrlWeb + "api/DocStatut";
      this.homeagsancDocPath = environment.apiUrlWeb + "api/DocSanction";
     }
  
    getAgentEchelonData(): Observable<any> {
      return this.http.get(this.homeagechPath)
    }

    getAgentEchelonDoc(data): Observable<any> {
      return this.http.get(this.homeagechDocPath+"/"+data)
    }

    getAgentSanctionDoc(data): Observable<any> {
      return this.http.get(this.homeagsancDocPath+"/"+data)
    }
    getAgentStatutDoc(data): Observable<any> {
      return this.http.get(this.homeagstatPath+"/"+data)
    }

    login(data): Observable<any> {
      return this.http.post(this.loginPath, data)
    }
  
    register(data): Observable<any> {
      return this.http.post(this.registerPath, data)
    }
  
    reset(data): Observable<any> {
      return this.http.post(this.resetPath, data)
    }
  
    modif(data): Observable<any> {
      return this.http.post(this.modifPath, data)
    }

    delete(data): Observable<any> {
      return this.http.post(this.deletePath, data)
    }

    saveToken(token) {
      localStorage.setItem('token', token)
    }
  
    getToken() {
      return localStorage.getItem('token')
    }
  
    isAuthenticated() {
        if (this.getToken()) {
          return true
        }
        return false;
    }
    GesteCategorie(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.categoriePath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.categoriePath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.categoriePath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.categoriePath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.categoriePath+"/"+id)
      }   
    }

    GesteAgents(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post<Agent>(this.AgentPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put<Agent>(this.AgentPath+"/"+id, data,{headers: this.headerLog})
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.AgentPath+"/"+id,{headers: this.headerLog})
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.AgentPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.AgentPath+"/"+id,{headers: this.header})
      }   
    }

    GesteClasse(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.ClassePath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.ClassePath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.ClassePath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.ClassePath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.ClassePath+"/"+id)
      }   
    }

    GesteGrade(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.GradePath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.GradePath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.GradePath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.GradePath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.GradePath+"/"+id)
      }   
    }
    

    GesteStatut(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.StatutPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.StatutPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.StatutPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.StatutPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.StatutPath+"/"+id)
      }   
    }

       GesteTypeSanction(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.TypeSanctionPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.TypeSanctionPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.TypeSanctionPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.TypeSanctionPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.TypeSanctionPath+"/"+id)
      }   
    }

    GesteEchelon(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.EchelonPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.EchelonPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.EchelonPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.EchelonPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.EchelonPath+"/"+id)
      }   
    }
    
    GesteAttrClasseGrade(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.AttrClasseGradePath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.AttrClasseGradePath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.AttrClasseGradePath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.AttrClasseGradePath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.AttrClasseGradePath+"/"+id)
      }   
    }


    GesteAttrEchelon(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.AttrEchelonPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.AttrEchelonPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.AttrEchelonPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.AttrEchelonPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.AttrEchelonPath+"/"+id)
      }   
    }

    GesteAttrSanction(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.AttrSanctionPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.AttrSanctionPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.AttrSanctionPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.AttrSanctionPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.AttrSanctionPath+"/"+id)
      }   
    }

    GesteAttrStatut(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.AttrStatutPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.AttrStatutPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.AttrStatutPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.AttrStatutPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.AttrStatutPath+"/"+id)
      }   
    }


    GesteUser(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.UserPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.UserPath+"/"+id, data)
      }   
      if(type=="remove") 
      {
        return this.http.delete(this.UserPath+"/"+id)
      }   
      if(type=="getAll") 
      {
        return this.http.get(this.UserPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.UserPath+"/"+id)
      }   
    }

    GesteJournal(type,data?,id?): Observable<any> {
      if(type=="add") 
      {
        console.log(type);
        
        return this.http.post(this.journalPath, data)

      }      
      if(type=="edit") 
      {
        return this.http.put(this.journalPath+"/"+id, data)
      }   
     
      if(type=="getAll") 
      {
        return this.http.get(this.journalPath)
      }   
      if(type=="getOne") 
      {
        return this.http.get(this.journalPath+"/"+id)
      }   
    }
  }
  