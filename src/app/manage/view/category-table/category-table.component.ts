import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CategoryDetail } from '../../add/category-form/category.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { GetAllService } from 'src/app/api/all/get-all.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styleUrls: ['./category-table.component.css'],
})
export class CategoryTableComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = ['id', 'NameA', 'NameL', 'edit'];
  dataSource;
  categories: any;
  resultOfMultiplication: any;
  HomeDetails: any;

  constructor(private service: GetAllService, private router: Router) {}

  ngOnInit(): void {
    this.service.getAllData('categories').subscribe(
      (response) => {
        this.categories = response;
        this.dataSource = new MatTableDataSource(this.categories);
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

  categoryForm() {
    this.categories = new CategoryDetail();
    this.router.navigate(['/manage/add/category', this.categories]);
  }
}
