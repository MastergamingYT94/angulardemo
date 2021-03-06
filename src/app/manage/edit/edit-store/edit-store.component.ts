import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AddDataService } from 'src/app/api/add/add-data.service';
import { GetAllService } from 'src/app/api/all/get-all.service';
import { GetDataService } from 'src/app/api/get/get-data.service';

import { StoresDetail } from '../../view/stores/Stores.model';

@Component({
  selector: 'app-edit-store',
  templateUrl: './edit-store.component.html',
  styleUrls: ['./edit-store.component.css'],
})
export class EditStoreComponent implements OnInit {
  Vendors: any;
  ShippingAgents: any;
  Countries: any;
  store: any;

  constructor(
    private route: ActivatedRoute,
    private all: GetAllService,
    private get: GetDataService,
    private update: AddDataService,
    private toastr: ToastrService
  ) {
    let id = this.route.snapshot.paramMap.get('Id');
    if (id)
      this.get
        .getData('stores', id)
        .subscribe((response) => (this.store = response));
  }

  ngOnInit(): void {
    this.all.getAllData('shippingAgents').subscribe(
      (response) => {
        this.ShippingAgents = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('vendors').subscribe(
      (response) => {
        this.Vendors = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );

    this.all.getAllData('countries').subscribe(
      (response) => {
        this.Countries = response;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
    this.store = StoresDetail;
  }

  updateStore(post: StoresDetail) {
    var options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };

    function success(pos) {
      var crd = pos.coords;
      post.Latitude = crd.latitude;
      post.Longitude = crd.longitude;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.watchPosition(success, error, options);

    if ((post.Latitude || post.Longitude) == (null || '')) {
      this.toastr.error('You must allow location to get coordinates');
    } else {
      location.assign('/manage/stores');
      post.id = this.store.id;
      this.update
        .updateData('stores', post.id, post)
        .pipe()
        .subscribe(
          () => {},
          (error) => {
            alert('An unexpected error occured.');
            console.log(error);
          }
        );
    }
  }
  autoGrowTextZone(e) {
    e.target.style.height = '0px';
    e.target.style.height = e.target.scrollHeight + 0 + 'px';
  }
}
