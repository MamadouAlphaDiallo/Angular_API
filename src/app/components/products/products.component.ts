import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/services/products.service';
import { Product } from 'src/app/model/products.model';
import { from, Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { startWith} from 'rxjs/operators';
import { DataStateEnum,AppDataState } from 'src/app/state/product.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
}) 

export class ProductsComponent implements OnInit {
  products$: Observable<AppDataState<Product[]>> |null=null;
  readonly DataStateEnum = DataStateEnum;
  constructor(private productsService:ProductsService, private router:Router) { }

  ngOnInit(): void {
  }
    // Pour afficher tous les produits //
  onGetAllProducts() {
    this.products$ = this.productsService.getAllProducts().pipe(
     map(data =>{
     return ({dataState:DataStateEnum.LOADED,data:data})
    }),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
      // Pour afficher touts les produits 
  onGetSelectProducts() {
    this.products$ = this.productsService.getSelectProducts().pipe(
     map(data =>({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  
    // Pour afficher tous les produits selectionnés//
  onGetAvailableProducts() {
    this.products$ = this.productsService.getAvailableProducts().pipe(
     map(data =>({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
     // Pour faire les recherches //
  onGetSearch(dataForm:any) {
    this.products$ = this.productsService.SearchProducts(dataForm.keyword).pipe(
     map(data =>({dataState:DataStateEnum.LOADED,data:data})),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );
  }
  onSelect(p:Product) {
   this.productsService.select(p)
       .subscribe(data=>{
        // this.onGetAllProducts();
        p.selected=data.selected;
       })
  }
  onDelete(p:Product) {
    let v = confirm("Etes vous sur de bien vouloir supprimer?");
      this.productsService.deleteProduct(p)
     .subscribe(data=>{
       this.onGetAllProducts();
     })
  }
  onNewProducts() {
    this.router.navigateByUrl("/newProduct");
  }
  
}
