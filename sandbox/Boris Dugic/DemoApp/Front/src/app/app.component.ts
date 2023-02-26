import { Component, OnInit } from '@angular/core';
import {Book} from './models/book.model';
import { BookService } from './service/book.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Front';
  books: Book[] = [];
  book : Book =
  {
    id:'',
    naslov: '',
    pisac: '',
    brojStrana: '',
    cena: ''
  }

  constructor(private bookService: BookService) {
  }
  ngOnInit(): void {
    this.dajSveKnjige();
  }

  dajSveKnjige() {
    this.bookService.dajSveKnjige()
      .subscribe(
        response => {
          this.books = response;
        }
      );
  }

   onSubmit() {
   if(this.book.id==='')
   {
      this.bookService.dodajKnjigu(this.book)
      .subscribe(
        response => {
          this.dajSveKnjige();
          this.book =
          {
            id:'',
            naslov: '',
            pisac: '',
            brojStrana: '',
            cena: ''
          }
        }
                );
    }
    else
    {
      this.updateBook(this.book);
    }
  }
  


  updateBook(book:Book)
  {
    this.bookService.updateBook(book)
    .subscribe(
      reponse =>
      {
        this.dajSveKnjige;
      }
    );
  }

  populateForm(book: Book)
  {
    this.book=book;
  }


deleteBook(id: string)
  {
    this.bookService.obrisiKnjigu(id)
    .subscribe(
      reponse =>
      {
        this.dajSveKnjige();
      }
    );
  }
}