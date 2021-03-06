import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { BrandsDetail } from './brands.model';
import { GetAllService } from 'src/app/api/all/get-all.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
})
export class BrandsComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'NameA', 'NameL', 'edit'];
  dataSource;
  Brands: any;

  constructor(private service: GetAllService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllData('brands').subscribe(
      (response) => {
        this.Brands = response;
        this.dataSource = new MatTableDataSource(this.Brands);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        alert('An unexpected error occured.');
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  BrandsForm() {
    this.router.navigate(['/manage/add/brand']);
  }
}
