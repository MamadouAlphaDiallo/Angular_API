import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ProductsService } from 'src/services/products.service';
//import {formGroup } from 'src/app/components/product-add/product-add.component';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  //Gestion du formulaire avec le module ReactiveForms
  //productForm: FormGroup |null=null;
  productFormGroup?: FormGroup;
  constructor(private fb:FormBuilder, public productsService:ProductsService) { }

  ngOnInit(): void {
    //initialisation et création d'un groupe de controle
    this.productFormGroup = this.fb.group({
      name:["", Validators.required],
      price:[0, Validators.required],
      quantity:[0, Validators.required],
      selected:[true, Validators.required],
      available:[true, Validators.required],


    });
  }
  onSaveProduct() {
    this.productsService.save(this.productFormGroup.value)
      .subscribe(data=>{
        alert("success saving product")
      });
  }

}
