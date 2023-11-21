export interface UserRegisterDto {
    name: string;
    phone: string;
    email: string;
    password: string;
}

export interface UserLoginDto {
    email: string ;
    phone: string ;
    password: string;
}

export interface ReturnUserLoged {
    user?: Object;
    token?: string;
    error?: string | unknown;
}

export interface getUserByUserId_DTO {
    user?: Object;
    error?: string | unknown;
}