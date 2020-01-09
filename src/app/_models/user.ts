export class User {
    /**
     * User Properties
     */
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    fingerPrintId: number;
    heartRate: number;

    /**
     * Contact Properties
     */
    phoneNumber: string;

    /**
     * Credential Properties
     */
    email: string;
    password: string;
    accountLocked: boolean;

    /**
     * API Response Token
     */
    token: string;
}
