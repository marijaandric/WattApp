import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Book} from '../models/book.model';

@Injectable({
    providedIn: 'root'
  })
  export class BookService {

    baseUrl = 'https://localhost:7159/api/Knjiga';
  
    constructor(private http: HttpClient) { }

    dajSveKnjige() : Observable<Book[]>
    {
      return this.http.get<Book[]>(this.baseUrl);
    }

    dodajKnjigu(book:Book): Observable<Book>
    {
      book.id='00000000-0000-0000-0000-000000000000';
      return this.http.post<Book>(this.baseUrl,book);
    }

    obrisiKnjigu(id:string) : Observable<Book>
    {
      return this.http.delete<Book>(this.baseUrl+'/'+id);
    }
    updateBook(card:Book): Observable<Book>
  {
    return this.http.put<Book>(this.baseUrl+'/'+card.id,card);
  }
}  