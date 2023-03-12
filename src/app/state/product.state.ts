export enum DataStateEnum {
    LOADING,
    LOADED,
    ERROR
}
//? correspond à un attribut facultatif et T est un type générique peut etre une liste ou autre chose
export interface AppDataState<T> {
    dataState? : DataStateEnum,
    data?: T, // est une liste de produit
    errorMessage?: string
} 