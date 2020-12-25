import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedAuthGuard implements CanActivate {

  constructor() { }
  canActivate()
  {
    return !localStorage.getItem('token')
  }
}
