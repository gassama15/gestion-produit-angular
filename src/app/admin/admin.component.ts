import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../produit';
import { ProduitService } from '../services/produit.service';
import {
 faEdit,
 faTrash
} from '@fortawesome/free-solid-svg-icons'
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  produits: Produit[];
  faEdit = faEdit;
  faTrash = faTrash;
  public editProduit: Produit|null;
  public deleteProduit: Produit | null;

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

  public onAddProduit(addForm: NgForm){
    document.getElementById('add-produit-form')?.click();
    // console.log(addForm.value);
    // return;
    this.produitService.addProduit(addForm.value).subscribe(
      (response: Produit) => {
        // console.log(response);
        this.getProduits();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    )
  }


  public onUpdateProduit(produit: Produit){
    document.getElementById('edit-produit-form')?.click();
    // console.log(produit);
    // return;
    this.produitService.updateProduit(produit).subscribe(
      (response: Produit) => {
        console.log(response);
        this.getProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }



  public onDeleteProduit(idProduit: number|null|undefined){
    document.getElementById('delete-produit-form')?.click();
    // console.log(produit);
    // return;
    this.produitService.deleteProduit(idProduit).subscribe(
      (response: void) => {
        console.log(response);
        this.getProduits();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public onOpenModal(produit: Produit|null, mode: string){
    const mainAdmin = document.getElementById('main-admin');
    const button = document.createElement('button');
    button.type ='button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addProduit');
    }
    if (mode === 'edit') {
      this.editProduit = produit;
      button.setAttribute('data-bs-target', '#editProduit');
    }
    if (mode === 'delete') {
      this.deleteProduit = produit;
      button.setAttribute('data-bs-target', '#deleteProduit');
    }
    mainAdmin?.appendChild(button);
    button.click();
  }


}
