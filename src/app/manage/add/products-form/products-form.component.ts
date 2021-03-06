import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { ProductsDetail } from '../../view/products/Products.model';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { AddDataService } from 'src/app/api/add/add-data.service';

declare var $: any;
@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrls: ['./products-form.component.css'],
})
export class ProductsFormComponent implements OnInit {
  Categories: any;
  Brands: any;

  constructor(
    private route: Router,
    private all: GetAllService,
    private add: AddDataService
  ) {}

  ngOnInit(): void {
    this.all.getSubCategories().subscribe(
      (response) => {
        this.Categories = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('brands').subscribe(
      (response) => {
        this.Brands = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    function readURL(input, img) {
      if (input.value && input.value[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          $(img).attr('src', e.target.result);
        };

        reader.readAsDataURL(input.value[0]);
      }
    }

    $('#Image').change(function () {
      readURL(this, '#imgsrc');
    });
    $('#Image2').change(function () {
      readURL(this, '#imgsrc2');
    });
    $('#Image3').change(function () {
      readURL(this, '#imgsrc3');
    });
    $('#Image4').change(function () {
      readURL(this, '#imgsrc4');
    });
  }

  saveProduct(post: ProductsDetail) {
    this.add
      .addData('products', post)
      .pipe()
      .subscribe(
        () => {},
        (error) => {
          alert('An unexpected error occured.');
          console.log(error);
        }
      );
    this.route.navigate(['/manage/products']);
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
