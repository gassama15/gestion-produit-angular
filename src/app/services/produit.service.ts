import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produit } from '../produit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProduitService{
  private apiUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient){}

  public getProduits(): Observable<Produit[]>{
    return this.http.get<Produit[]>(`${this.apiUrl}/produit`);
  }


  public addProduit(produit: Produit): Observable<Produit>{
    return this.http.post<Produit>(`${this.apiUrl}/produit/new`, produit);
  }


  public updateProduit(produit: Produit): Observable<Produit>{
    return this.http.put<Produit>(`${this.apiUrl}/produit/update`, produit);
  }


  public deleteProduit(idProduit: number|null|undefined): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/produit/delete/${idProduit}`);
  }
}
