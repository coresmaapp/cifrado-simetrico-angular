import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private http = inject(HttpClient);

  private encryt = `http://localhost:8000/api/encryt/simetrico/`
  private decryt = `http://localhost:8000/api/decryt/simetrico/`

  


  constructor() { }

  encript(data: any){
    return this.http.post(this.encryt, data)
  }

  decript(data: any){
    return this.http.post(this.decryt, data)
  }

}
