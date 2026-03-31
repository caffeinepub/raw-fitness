import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface MembershipPlan {
    id: bigint;
    featured: boolean;
    features: Array<string>;
    period: string;
    name: string;
    price: string;
}
export interface Transformation {
    id: bigint;
    result: string;
    duration: string;
    name: string;
}
export interface UserProfile {
    name: string;
}
export interface Trainer {
    id: bigint;
    bio: string;
    title: string;
    cert: string;
    name: string;
    experience: string;
    imageUrl: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createMembershipPlan(name: string, price: string, period: string, featured: boolean, features: Array<string>): Promise<bigint>;
    createTrainer(name: string, title: string, experience: string, cert: string, bio: string, imageUrl: string): Promise<bigint>;
    createTransformation(name: string, result: string, duration: string): Promise<bigint>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMembershipPlanById(id: bigint): Promise<MembershipPlan | null>;
    getMembershipPlans(): Promise<Array<MembershipPlan>>;
    getTrainerById(id: bigint): Promise<Trainer | null>;
    getTrainers(): Promise<Array<Trainer>>;
    getTransformationById(id: bigint): Promise<Transformation | null>;
    getTransformations(): Promise<Array<Transformation>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    initializeDefaultData(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
