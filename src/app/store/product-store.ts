import { inject } from '@angular/core';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product';
import { Toaster } from '../services/toaster';

type ProductState = {
    categories: string[];
    selectedCategory: string;
    products: Product[];
    wishlistItems: Product[];
};


const initialState: ProductState = {
    categories: ['all', 'electronics', 'home & living', 'apparel', 'beauty & skincare', 'kitchenware'],
    selectedCategory: 'all',
    products: [
        // --- Tech Gadget (Headphones) ---
        {
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
        },

        // --- Home Decor (Candle) ---
        {
            id: 2,
            name: 'Hand-Poured Soy Wax Candle',
            description: 'All-natural soy wax candle with a subtle, calming lavender and vanilla scent, perfect for relaxation.',
            price: 24.50,
            // Pexels URL for product photo (Candle)
            imageUrl: 'https://images.pexels.com/photos/7420138/pexels-photo-7420138.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.9,
            reviewsCount: 512,
            inStock: true,
            category: 'home & living',
        },

        // --- Fashion/Apparel (T-Shirt) ---
        {
            id: 3,
            name: 'Organic Cotton Crewneck T-Shirt',
            description: 'A classic, comfortable crewneck t-shirt made from 100% sustainably sourced organic cotton.',
            price: 39.99,
            // Pexels URL for product photo (T-Shirt)
            imageUrl: 'https://images.pexels.com/photos/4066290/pexels-photo-4066290.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.4,
            reviewsCount: 201,
            inStock: true,
            category: 'apparel',
        },

        // --- Health/Wellness/Beauty (Serum) ---
        {
            id: 4,
            name: 'Hydrating Facial Serum',
            description: 'A potent blend of hyaluronic acid and Vitamin C to brighten and deeply hydrate the skin.',
            price: 49.00,
            // Pexels URL for product photo (Serum)
            imageUrl: 'https://images.pexels.com/photos/8537671/pexels-photo-8537671.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.8,
            reviewsCount: 789,
            inStock: false, // Example of out of stock
            category: 'beauty & skincare',
        },

        // --- Kitchenware/Drinkware (Water Bottle) ---
        {
            id: 5,
            name: 'Insulated Stainless Steel Water Bottle',
            description: 'Keeps drinks cold for 24 hours and hot for 12 hours. Perfect for travel and daily hydration.',
            price: 29.95,
            // Pexels URL for product photo (Water Bottle)
            imageUrl: 'https://images.pexels.com/photos/9906152/pexels-photo-9906152.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.6,
            reviewsCount: 125,
            inStock: true,
            category: 'kitchenware',
        },

        // --- Photography/Accessory (Drone) ---
        {
            id: 6,
            name: 'Portable Mini Drone with 4K Camera',
            description: 'Compact, foldable drone with high-definition 4K video recording and smart follow features.',
            price: 399.00,
            // Pexels URL for product photo (Drone)
            imageUrl: 'https://images.pexels.com/photos/347572/pexels-photo-347572.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.3,
            reviewsCount: 88,
            inStock: true,
            category: 'electronics',
        },

        // --- Pet Product (Dog Toy) ---
        {
            id: 7,
            name: 'Eco-Friendly Dog Chew Toy',
            description: 'Durable, non-toxic toy made from natural rubber, designed for aggressive chewers.',
            price: 15.75,
            // Pexels URL for product photo (Dog Toy)
            imageUrl: 'https://images.pexels.com/photos/16474917/pexels-photo-16474917/free-photo-of-tennis-ball-toy-on-the-grass.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.7,
            reviewsCount: 154,
            inStock: true,
            category: 'pet products',
        },

        // --- Jewelry/Accessory (Ring) ---
        {
            id: 8,
            name: 'Minimalist Sterling Silver Ring',
            description: 'Simple and elegant sterling silver band, perfect for stacking or wearing alone.',
            price: 55.00,
            // Pexels URL for product photo (Ring)
            imageUrl: 'https://images.pexels.com/photos/10186178/pexels-photo-10186178.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.9,
            reviewsCount: 68,
            inStock: true,
            category: 'jewelry',
        },

        // --- Fitness Equipment (Yoga Mat) ---
        {
            id: 9,
            name: 'Professional Yoga Mat (TPE)',
            description: 'Thick, non-slip, eco-friendly TPE mat providing superior grip and cushioning for all yoga styles.',
            price: 45.99,
            // Pexels URL for product photo (Yoga Mat)
            imageUrl: 'https://images.pexels.com/photos/3820358/pexels-photo-3820358.jpeg?auto=compress&cs=tinysrgb&w=350',
            rating: 4.5,
            reviewsCount: 92,
            inStock: false, // Example of out of stock
            category: 'health & fitness',
        },
    ],
    wishlistItems: [],
};

export const ProductStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withComputed(({ products, categories, selectedCategory, wishlistItems }) => ({
        filteredProducts: () =>
            products().filter(product => selectedCategory() === 'all' || product.category === selectedCategory()),
        wishlistCount: () => wishlistItems().length,
        wishlistItems: () => wishlistItems(),
    })
    ),
    withMethods((store, toaster = inject(Toaster)) => ({
        setCategory: signalMethod((category: string) => {
            patchState(store, { selectedCategory: category });
        }),
        addToWishlist: signalMethod((product: Product) => {
            const currentWishlist = store.wishlistItems();
            if (!currentWishlist.find(item => item.id === product.id)) {
                const newWishlist = [...currentWishlist, product];                
                patchState(store, { wishlistItems: newWishlist });
                toaster.success('Product added to wishlist!');
            }
        }),
        removeFromWishlist: signalMethod((productId: number) => {
            const updatedWishlist = store.wishlistItems().filter(item => item.id !== productId);
            patchState(store, { wishlistItems: updatedWishlist });
            toaster.success('Product removed from wishlist.');
        })
    }))
);