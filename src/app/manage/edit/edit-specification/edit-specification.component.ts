import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';
import { ProductSpecificationDetails } from '../../../views/product-specification/product-specification.model';

@Component({
  selector: 'app-edit-specification',
  templateUrl: './edit-specification.component.html',
  styleUrls: ['./edit-specification.component.css'],
})
export class EditSpecificationComponent implements OnInit {
  specification: any;
  Products: any;
  ProductId: any;
  Categories: any;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    this.ProductId = id;
    if (id)
      this.get
        .getData('productSpecifications', id)
        .subscribe((response) => (this.specification = response));
  }

  ngOnInit(): void {
    this.all.getAllData('products').subscribe(
      (response) => {
        this.Products = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('categories').subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.specification = ProductSpecificationDetails;
  }

  updateProductSpecification(post: ProductSpecificationDetails) {
    post.id = this.specification.id;
    this.update
      .updateData('productSpecifications', post.id, post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    location.assign('/manage/edit/product/' + this.specification.ProductId);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
