import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ProductsGrid } from './products-grid';
import { provideZonelessChangeDetection, SimpleChanges } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

describe('ProductsGrid', () => {
  let component: ProductsGrid;
  let fixture: ComponentFixture<ProductsGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsGrid],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: ActivatedRoute,
          useValue: {
            params: new BehaviorSubject({ category: 'all' })
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductsGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have mat-nav-list', () => {
    const navList = fixture.nativeElement.querySelector('mat-nav-list');
    expect(navList).toBeTruthy();
  });

  it('should set category when user changes it', () => {
    const storeSpy = spyOn(component.store, 'setCategory');

    const changes: SimpleChanges = {
      category: {
        currentValue: "home & living",
        firstChange: false,
        previousValue: "beauty & skincare",
        isFirstChange: () => false
      }
    };

    component.ngOnChanges(changes);
    expect(storeSpy).toHaveBeenCalled()
  });
});
