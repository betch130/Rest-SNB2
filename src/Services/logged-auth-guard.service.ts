import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoggedAuthGuard implements CanActivate {

  constructor() { }

  canActivate()
  {
    return !!localStorage.getItem('token')
  }

}
