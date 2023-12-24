
export interface IAuth {
    _id: string;
    fullname: string,
    email: string;
    password: string;
}

export interface IAuthResponse {
    userId: string;
    accessToken: string;
}