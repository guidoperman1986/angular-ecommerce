import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist').then(c => c.MyWishlist)
    },
    {
        path: 'products/:category',
        loadComponent: () => import('./pages/products-grid/products-grid').then(c => c.ProductsGrid)
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/view-cart/view-cart').then(c => c.ViewCart)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./pages/checkout/checkout').then(c => c.Checkout)
    },
    {
        path: 'product/:productId',
        loadComponent: () => import('./pages/view-product-detail/view-product-detail').then(c => c.ViewProductDetail)
    },
    {
        path: 'order-success',
        loadComponent: () => import('./pages/order-success/order-success').then(c => c.OrderSuccess)
    },
    {
        path: '',
        redirectTo: 'products/all',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
