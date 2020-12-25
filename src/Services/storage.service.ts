import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
//import { Storage } from '@ionic/storage';
@Injectable({
providedIn: 'root'
})




export class StorageService {
 
constructor( public store:Storage, public plat:Platform,
)
{ 
  


 console.log('Your storage provider is working here !'); }



/*
async setweb(key: string, value: any): Promise<any> {
  try {
  const result = await this.store.set(key, value);
  console.log('set string in store: ' + result);
  return true;
  } catch (reason) {
  console.log(reason);
  return false;
  }
  }
  // to getweb a key/value pair
  async getweb(key: string): Promise<any> {
  try {
  const result = await this.store.get(key);
  console.log('storeGET: ' + key + ': ' + result);
  if (result != null) {
  return result;
  }
  return null;
  } catch (reason) {
  alert(reason);
  return null;
  }
  }


  // set a key/value object
  async setwebObject(key: string, object: Object) {
  try {
  const result = await this.store.set(key, JSON.stringify(object));
  console.log('set Object in store: ' + result);
  return true;
  } catch (reason) {
  console.log(reason);
  return false;
  }
  }

  
  // getweb a key/value object
  async getwebObject(key: string): Promise<any> {
  try {
  const result = await this.store.get(key);
  if (result != null) {
  return JSON.parse(result);
  }
  return null;
  } catch (reason) {
  console.log(reason);
  return null;
  }
  }

  // remove a single key value:
  removeweb(key: string) {
  this.store.remove(key);
  }
  //  delete all data from your application:
  clearweb() 
  {
  this.store.clear();
  }
  
  getwebUser():any
  { 
     this.store.get('current').then((val)=>{
       console.log(val);
  return JSON.stringify(val);
      });
  }
  getwebAssoKey(x?) 
  {
   return this.store.get('assoKey');
      
    }
   getwebuserKey():any
   {
     
    this.store.get('currentKey').then((val)=>{
      console.log(val);
    
     return val;
    });
    
   }
  
*/

}