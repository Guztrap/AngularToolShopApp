import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductsService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    filteredProduct: IProduct[];
    products: IProduct[] = [];
    errorMessage: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }

    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProduct = this.listFilter ? this.perfomFilter(this.listFilter) : this.products;
    }

      constructor(private productService: ProductsService) { }

      ngOnInit(): void {
        console.log('In OnInit');
        this.productService.getProducts().subscribe(
            products => {
             this.products = products;
             this.filteredProduct = this.products;
            },
            error => this.errorMessage = <any>error);
    }

      toggleImage(): void {
          this.showImage = !this.showImage;
      }

      perfomFilter(filterBy: string): IProduct[] {
          filterBy = filterBy.toLocaleLowerCase();

          return this.products.filter((product: IProduct) =>
          product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
      }

      onRatingClick(message: string): void {
          this.pageTitle = `Product list: ${message}`;
      }
}
