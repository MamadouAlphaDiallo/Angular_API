import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { from, Observable } from 'rxjs';
import { environment} from 'src/environments/environment';
import {Product} from 'src/app/model/products.model';
@Injectable({providedIn:"root"})  //providein: disponible dans toute l'application
export class ProductsService{
    constructor(private http: HttpClient){
    }
    // Consulter la liste des produits par exemple
    getAllProducts():Observable<Product[]> {
        let host = environment.host;
        //let host = (Math.random()>0.3)? environment.host:environment.unerachablehost;
        return this.http.get<Product[]>(host +"/products");
    }
     // Selectionner un produits
     getSelectProducts():Observable<Product[]> {
        let host = environment.host;
        return this.http.get<Product[]>(host +"/products?selected=true");
    }
     // Selectionner les produits disponibles
     getAvailableProducts():Observable<Product[]> {
        let host = environment.host;
        return this.http.get<Product[]>(host +"/products?available=true");
    }

    SearchProducts(keyword:string) {
        let host = environment.host;
        return this.http.get<Product[]>(host +"/products?name_like=" +keyword);
    }
     //Selectionner un produit à partir de l'icone
    select(product:Product):Observable<Product> {
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.put<Product>(host +"/products/" + product.id,product);

    }

     //Selectionner un produit à partir de l'icone
    deleteProduct(product:Product):Observable<void> {
        let host = environment.host;
        product.selected = !product.selected;
        return this.http.delete<void>(host +"/products/" + product.id);
    }

    save(product:Product):Observable<Product> {
        let host = environment.host;
        //product.selected = !product.selected;
        return this.http.post<Product>(host +"/products", product);

    }
}
