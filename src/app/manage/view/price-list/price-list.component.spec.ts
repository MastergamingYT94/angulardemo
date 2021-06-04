import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PriceListComponent } from './price-list.component';

describe('PriceListComponent', () => {
  let component: PriceListComponent;
  let fixture: ComponentFixture<PriceListComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PriceListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
