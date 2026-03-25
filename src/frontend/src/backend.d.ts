import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface StoreInfo {
    tagline: string;
    name: string;
    whatsapp: string;
    email: string;
    address: string;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export interface Product {
    id: bigint;
    featured: boolean;
    name: string;
    createdAt: bigint;
    description: string;
    category: string;
    image?: ExternalBlob;
    priceINR: number;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    _initializeAccessControl(): Promise<undefined>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Product
     */
    createProduct(productData: Product): Promise<bigint>;
    deleteProduct(productId: bigint): Promise<void>;
    /**
     * / User Profile
     */
    getCallerUserProfile(): Promise<UserProfile | null>;
    /**
     * / Storage
     */
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProducts(): Promise<Array<Product>>;
    getProduct(productId: bigint): Promise<Product>;
    getProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    /**
     * / Store Info
     */
    getStoreInfo(): Promise<StoreInfo>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateProduct(productId: bigint, updatedProduct: Product): Promise<void>;
    updateStoreInfo(updatedStoreInfo: StoreInfo): Promise<void>;
}
