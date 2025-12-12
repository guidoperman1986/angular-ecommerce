import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { SignInParams, SignUpParams, User } from "../models/user";
import { inject } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { Toaster } from "../services/toaster";
import { withStorageSync } from "@angular-architects/ngrx-toolkit";

type UserState = {
    user: User | undefined;
}

const initialState: UserState = {
    user: undefined
}

export const UserStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withStorageSync({
        key: 'user-store',
        select: ({ user }) => ({ user })
    }),
    withMethods((store, toaster = inject(Toaster), matDialog = inject(MatDialog), router = inject(Router)) => ({
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
    }))
);