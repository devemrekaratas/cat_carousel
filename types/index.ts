export interface ICatModel {
    id: string
    url: string
    width: number
    height: number
}

export interface ILoginCredentials {
    email: string
    password: string
}

export interface IRegisterCredentials {
    displayName: string
    email: string
    password: string
}