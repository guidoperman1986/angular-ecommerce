import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyWishlist } from './my-wishlist';
import { provideZonelessChangeDetection } from '@angular/core';

describe('MyWishlist', () => {
  let component: MyWishlist;
  let fixture: ComponentFixture<MyWishlist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyWishlist],
      providers: [provideZonelessChangeDetection()]
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
