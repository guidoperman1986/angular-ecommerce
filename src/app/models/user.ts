export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
}

export type SignUpParams = {
    name: string;
    email: string;
    password: string;
    dialogId: string;
    checkout?: boolean;
}

export type SignInParams = Omit<SignUpParams, 'name'>;