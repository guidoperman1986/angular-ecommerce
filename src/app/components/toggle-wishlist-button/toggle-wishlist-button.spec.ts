import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleWishlistButton } from './toggle-wishlist-button';
import { provideZonelessChangeDetection, signal, WritableSignal } from '@angular/core';
import { ProductStore } from '../../store/product-store';

class MockStore {
  wishlistItems: WritableSignal<any[]> = signal([]);
  addToWishlist(product: any) { }
  removeFromWishlist(id: any) { }
}

describe('ToggleWishlistButton', () => {
  let component: ToggleWishlistButton;
  let fixture: ComponentFixture<ToggleWishlistButton>;
  let mockStore: MockStore;

  beforeEach(async () => {
    mockStore = new MockStore();

    await TestBed.configureTestingModule({
      imports: [ToggleWishlistButton],
      providers: [
        provideZonelessChangeDetection(),
        { provide: ProductStore, useValue: mockStore }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToggleWishlistButton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle a product to wishlist', () => {
    const spyAddToStore = spyOn(mockStore, 'addToWishlist');

    const product = {
      id: 1,
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium over-ear headphones with industry-leading noise cancellation and crystal-clear audio quality.',
      price: 249.99,
      // Pexels URL for product photo (Headphones)
      imageUrl: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=350',
      rating: 4.7,
      reviewsCount: 354,
      inStock: true,
      category: 'electronics',
    }

    component.toggleWishlist(product);
    expect(spyAddToStore).toHaveBeenCalled()
    expect(component.isInWhishlist).toBeTruthy();
  })

  xit('should delete a product from wishtlist', () => {
    const spyStore = spyOn(component.store, 'removeFromWishlist');
    const product = {
      id: 1,
      name: 'Wireless Noise-Canceling Headphones',
      description: 'Premium over-ear headphones with industry-leading noise cancellation and crystal-clear audio quality.',
      price: 249.99,
      // Pexels URL for product photo (Headphones)
      imageUrl: 'https://images.pexels.com/photos/1036856/pexels-photo-1036856.jpeg?auto=compress&cs=tinysrgb&w=350',
      rating: 4.7,
      reviewsCount: 354,
      inStock: true,
      category: 'electronics',
    }

    mockStore.wishlistItems.set([product])


    component.toggleWishlist(product);
    expect(spyStore).toHaveBeenCalled()
  })
});
