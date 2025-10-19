import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full'
    },
    {
        path: 'wishlist',
        loadComponent: () => import('./pages/my-wishlist/my-wishlist').then(c => c.MyWishlist)
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/products-grid/products-grid').then(c => c.ProductsGrid)
    },
    {
        path: '**',
        redirectTo: 'products'
    }
];
