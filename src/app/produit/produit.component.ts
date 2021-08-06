import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {
  faShoppingCart,
  faEye
} from '@fortawesome/free-solid-svg-icons'
import { Produit } from '../produit';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {

  produits: Produit[];
  faCart = faShoppingCart;
  faEye = faEye;

  constructor(private produitService: ProduitService) { }

  ngOnInit(){
    this.getProduits()
  }

  public getProduits(){
    this.produitService.getProduits().subscribe(
      (data: Produit[]) => {
        console.log(data);
        this.produits = data;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}
