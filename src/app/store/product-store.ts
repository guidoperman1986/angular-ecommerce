import { inject } from '@angular/core';
import { patchState, signalMethod, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from '../models/product';
import { Toaster } from '../services/toaster';
import { CartItem } from '../models/cart';
import { MatDialog } from '@angular/material/dialog';
import { SignInDialog } from '../components/sign-in-dialog/sign-in-dialog';
import { SignInParams, SignUpParams, User } from '../models/user';
import { Router } from '@angular/router';
import { Order } from '../models/order';
import { withStorageSync } from "@angular-architects/ngrx-toolkit";
import { AddReviewParams, UserReview } from '../models/user-review';

type ProductState = {
    categories: string[];
    selectedCategory: string;
    products: Product[];
    wishlistItems: Product[];
    cartItems: CartItem[];
    user: User | undefined;
    loading: boolean;
    selectedProductId: string | undefined;
    writeReview: boolean;
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
            rating: 3.7,
            reviewsCount: 354,
            inStock: true,
            category: 'electronics',
            reviews: [
                {
                    id: '101',
                    productId: 1,
                    userName: 'Emily R.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
                    rating: 4,
                    title: 'Great Sound & ANC',
                    comment: 'Sound quality is fantastic. Noise canceling works well in office environments.',
                    reviewDate: new Date('2023-10-10')
                },
                {
                    id: '102',
                    productId: 1,
                    userName: 'Michael B.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
                    rating: 5,
                    title: 'Amazing Battery Life',
                    comment: 'Battery life is impressive. I can go a whole week without charging.',
                    reviewDate: new Date('2023-11-05')
                },
                {
                    id: '103',
                    productId: 1,
                    userName: 'David K.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
                    rating: 3,
                    title: 'Good Comfort, Heavy Bass',
                    comment: 'Comfortable, but the bass is a bit too heavy for my taste.',
                    reviewDate: new Date('2023-09-22')
                }
            ]
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
            reviews: [
                {
                    id: '201',
                    productId: 2,
                    userName: 'Sarah L.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/65.jpg',
                    rating: 5,
                    title: 'Heavenly Scent',
                    comment: 'The scent is heavenly! Not too strong, just perfect for a relaxing evening.',
                    reviewDate: new Date('2023-12-01')
                },
                {
                    id: '202',
                    productId: 2,
                    userName: 'Jessica M.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/23.jpg',
                    rating: 4,
                    title: 'Long Lasting Burn',
                    comment: 'Burns evenly and lasts a long time. Will buy again.',
                    reviewDate: new Date('2023-11-15')
                }
            ]
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
            reviews: [
                {
                    id: '301',
                    productId: 3,
                    userName: 'Chris P.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
                    rating: 5,
                    title: 'Soft & True to Size',
                    comment: 'Super soft material and the fit is true to size. Great quality t-shirt.',
                    reviewDate: new Date('2023-10-28')
                },
                {
                    id: '302',
                    productId: 3,
                    userName: 'Alex T.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/8.jpg',
                    rating: 4,
                    title: 'Good Basic Tee',
                    comment: 'Nice basic tee. Shrunk a tiny bit after the first wash, but still fits.',
                    reviewDate: new Date('2023-09-05')
                }
            ]
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
            reviews: [
                {
                    id: '401',
                    productId: 4,
                    userName: 'Amanda W.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/90.jpg',
                    rating: 5,
                    title: 'Hydrating & Plumping',
                    comment: 'My skin feels so much more hydrated and plump. Love this serum!',
                    reviewDate: new Date('2023-11-20')
                },
                {
                    id: '402',
                    productId: 4,
                    userName: 'Rachel G.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/33.jpg',
                    rating: 5,
                    title: 'Worth the Price',
                    comment: 'A bit pricey, but totally worth it. The Vitamin C brightens my complexion.',
                    reviewDate: new Date('2023-10-12')
                },
                {
                    id: '403',
                    productId: 4,
                    userName: 'Linda B.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/11.jpg',
                    rating: 4,
                    title: 'Quick Absorption',
                    comment: 'Good texture, absorbs quickly.',
                    reviewDate: new Date('2023-12-05')
                }
            ]
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
            reviews: [
                {
                    id: '501',
                    productId: 5,
                    userName: 'Mark S.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
                    rating: 5,
                    title: 'Stays Cold All Day',
                    comment: 'Keeps water ice cold all day long, even in the hot sun.',
                    reviewDate: new Date('2023-08-30')
                },
                {
                    id: '502',
                    productId: 5,
                    userName: 'Daniel H.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/19.jpg',
                    rating: 4,
                    title: 'Durable but Tight Lid',
                    comment: 'Durable bottle, but the lid can be a bit hard to unscrew sometimes.',
                    reviewDate: new Date('2023-09-15')
                }
            ]
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
            reviews: [
                {
                    id: '601',
                    productId: 6,
                    userName: 'TechnologyFan99',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/99.jpg',
                    rating: 4,
                    title: 'Excellent Entry-Level',
                    comment: 'Great entry-level drone. 4K video is surprisingly good for the price.',
                    reviewDate: new Date('2023-11-01')
                },
                {
                    id: '602',
                    productId: 6,
                    userName: 'Sam V.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/4.jpg',
                    rating: 5,
                    title: 'Fun & Stable',
                    comment: 'So much fun to fly! Very stable and easy to control.',
                    reviewDate: new Date('2023-10-25')
                }
            ]
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
            reviews: [
                {
                    id: '701',
                    productId: 7,
                    userName: 'Laura P.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/52.jpg',
                    rating: 5,
                    title: 'Tough Toy',
                    comment: 'My pitbull loves this toy and hasn\'t destroyed it yet! Very tough.',
                    reviewDate: new Date('2023-11-10')
                },
                {
                    id: '702',
                    productId: 7,
                    userName: 'Kevin O.',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/45.jpg',
                    rating: 4,
                    title: 'Dog Loves It',
                    comment: 'Good boy loves it.',
                    reviewDate: new Date('2023-12-02')
                }
            ]
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
            reviews: [
                {
                    id: '801',
                    productId: 8,
                    userName: 'Sophia L.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
                    rating: 5,
                    title: 'Beautiful & Delicate',
                    comment: 'Beautiful and delicate. Exactly what I was looking for.',
                    reviewDate: new Date('2023-09-28')
                },
                {
                    id: '802',
                    productId: 8,
                    userName: 'Grace Kelly',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/88.jpg',
                    rating: 5,
                    title: 'High Quality',
                    comment: 'High quality silver, hasn\'t tarnished at all.',
                    reviewDate: new Date('2023-11-12')
                }
            ]
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
            reviews: [
                {
                    id: '901',
                    productId: 9,
                    userName: 'YogiBear',
                    userImageUrl: 'https://randomuser.me/api/portraits/men/60.jpg',
                    rating: 5,
                    title: 'Superior Grip',
                    comment: 'Best grip I have ever had on a mat. No slipping during downward dog.',
                    reviewDate: new Date('2023-10-05')
                },
                {
                    id: '902',
                    productId: 9,
                    userName: 'Chloe D.',
                    userImageUrl: 'https://randomuser.me/api/portraits/women/70.jpg',
                    rating: 3,
                    title: 'Great Cushioning',
                    comment: 'It is a bit heavy to carry around, but the cushioning is great.',
                    reviewDate: new Date('2023-11-18')
                }
            ]
        },
    ],
    wishlistItems: [],
    cartItems: [],
    user: undefined,
    loading: false,
    writeReview: false,
    selectedProductId: undefined
};

export const ProductStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withStorageSync({ key: 'product-store', select: ({ wishlistItems, cartItems, user }) => ({ wishlistItems, cartItems, user }) }),
    withComputed(({ products, categories, selectedCategory, wishlistItems, cartItems, selectedProductId }) => ({
        filteredProducts: () =>
            products().filter(product => selectedCategory() === 'all' || product.category === selectedCategory()),
        wishlistCount: () => wishlistItems().length,
        wishlistItems: () => wishlistItems(),
        cartCount: () => cartItems().reduce((acc, item) => acc + item.quantity, 0),
        selectedProduct: () => selectedProductId() ? products().find(product => product.id === +selectedProductId()!) : undefined
    })
    ),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
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
        }),
        clearWishList: () => {
            patchState(store, { wishlistItems: [] })
        },
        addToCart: (product: Product, quantity = 1) => {
            const existingItemIndex = store.cartItems().findIndex(item => item.product.id === product.id);
            if (existingItemIndex !== -1) {
                const updatedCartItems = store.cartItems().map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    }
                    return item;
                })

                patchState(store, { cartItems: updatedCartItems })
            } else {
                patchState(store, { cartItems: [...store.cartItems(), { product, quantity }] })

            }
            toaster.success(existingItemIndex === -1 ? 'Product added to the cart' : 'The product quantity was updated');
            console.log(store.cartItems());
        },
        setItemQuantity: (params: { productId: number, quantity: number }) => {
            const existingIndex = store.cartItems().findIndex(item => item.product.id === params.productId)

            const updatedCartItems = store.cartItems().map((item, index) => {
                if (index === existingIndex) {
                    return {
                        ...item,
                        quantity: params.quantity
                    }
                }
                return item;
            })

            patchState(store, { cartItems: updatedCartItems })
        },
        addAllWishListToCart: () => {
            let notExistingItemsOnCart: CartItem[] = []
            for (const wishItem of store.wishlistItems()) {
                const existingItemOnCart = store.cartItems().findIndex(item => item.product.id === wishItem.id) !== -1

                if (!existingItemOnCart) {
                    notExistingItemsOnCart.push({ product: wishItem, quantity: 1 });
                }
            }

            patchState(store, { cartItems: [...store.cartItems(), ...notExistingItemsOnCart] })
            patchState(store, { wishlistItems: [] })

            toaster.success('All elements were added to your cart!')
        },
        moveToWishlist: (product: Product) => {
            const productExistsOnWishlist = store.wishlistItems().find(item => item.id === product.id);
            if (productExistsOnWishlist) return;

            patchState(store, { wishlistItems: [...store.wishlistItems(), product] })
            toaster.success('Product moved to Wishlist')
        },
        deleteFromCart: (productId: number) => {
            const updatedCartItems = store.cartItems().filter(item => item.product.id !== productId)
            patchState(store, { cartItems: updatedCartItems });

            toaster.success('Product removed from Cart')
        },
        proceedToCheckout: () => {
            if (!store.user()) {
                matDialog.open(SignInDialog, {
                    disableClose: true,
                    data: {
                        checkout: true
                    }
                })
            } else {
                router.navigate(['/checkout']);
            }
        },
        signIn: ({ email, password, checkout, dialogId }: SignInParams) => {
            patchState(store, {
                user: {
                    id: '1',
                    email,
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
                }
            })

            matDialog.getDialogById(dialogId)?.close();

            if (checkout) {
                router.navigate(['/checkout']);
            }
        },
        signUp: ({ email, password, name, checkout, dialogId }: SignUpParams) => {
            patchState(store, {
                user: {
                    id: '1',
                    email,
                    name: 'John Doe',
                    imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
                }
            })

            matDialog.getDialogById(dialogId)?.close();

            if (checkout) {
                router.navigate(['/checkout']);
            }
        },
        signOut: () => {
            patchState(store, {
                user: undefined
            })
        },
        placeOrder: async () => {
            patchState(store, { loading: true })

            const user = store.user()
            if (!user) {
                patchState(store, { loading: false });
                toaster.error('You must be logged in to place an order')
                return;
            }

            const order: Order = {
                id: crypto.randomUUID(),
                userId: user.id,
                items: store.cartItems(),
                total: Math.round(store.cartItems().reduce((acc, item) => acc + item.product.price * item.quantity, 0)),
                paymentStatus: 'pending'
            }

            await new Promise(resolve => setTimeout(resolve, 2000))
            patchState(store, { loading: false, cartItems: [] })
            toaster.success('Order placed successfully')
            router.navigate(['/order-success'])
        },
        setSelectedProductId: signalMethod((productId: string) => {
            patchState(store, { selectedProductId: productId })
        }),
        setWriteReview: signalMethod((writeReview: boolean) => {
            patchState(store, { writeReview })
        }),
        addReview: async (reviewParams: AddReviewParams) => {
            patchState(store, { loading: true })

            const user = store.user()
            if (!user) {
                patchState(store, { loading: false });
                toaster.error('You must be logged in to add a review')
                return;
            }

            const product = store.products().find(product => product.id === +store.selectedProductId()!)
            if (!product) {
                patchState(store, { loading: false });
                toaster.error('Product not found')
                return;
            }

            const review: UserReview = {
                userName: user.name,
                userImageUrl: user.imageUrl,
                id: crypto.randomUUID(),
                productId: product.id,
                ...reviewParams,
                reviewDate: new Date()
            }

            const updatedProducts = store.products().map(product => {
                if (product.id === +store.selectedProductId()!) {
                    return {
                        ...product,
                        reviews: [...product.reviews, review]
                    };
                }
                return product;
            })

            await new Promise(resolve => setTimeout(resolve, 2000));
            patchState(store, { products: updatedProducts, loading: false, writeReview: false });
            toaster.success('Review added successfully');
        }
    }))
);