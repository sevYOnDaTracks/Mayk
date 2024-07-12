// src/app/models/user.model.ts
export interface User {
    photoURL: string;
    uid: string;
    firstName: string;
    lastName: string;
    phone: string;
    birthDate: Date; // You may want to use Date type instead
    degreeLevel: string;
    email: string;
}
