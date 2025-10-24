import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlist } from './my-wishlist';
import { provideZonelessChangeDetection } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('MyWishlist', () => {
  let component: MyWishlist;
  let fixture: ComponentFixture<MyWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWishlist],
      providers: [provideZonelessChangeDetection(), {
        provide: ActivatedRoute,
        useValue: {
          params: new BehaviorSubject({ category: 'all' })
        }
      }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MyWishlist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
