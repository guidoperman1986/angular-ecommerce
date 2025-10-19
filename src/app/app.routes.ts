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
        path: '',
        redirectTo: 'products/all',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
