import {HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";

export class TokenInterceptorService implements HttpInterceptor{
  token: string;
  intercept(req: HttpRequest<any>, next: HttpHandler){
    let modifiedReq;
    let userData = JSON.parse(localStorage.getItem('userData'))
    if(userData){
      this.token = userData.token;
      modifiedReq = req.clone({
        headers: req.headers.append('authorization', `Bearer ${this.token}`)
      })
    } else {
      modifiedReq = req.clone()
    }
    return next.handle(modifiedReq)
  }

}
