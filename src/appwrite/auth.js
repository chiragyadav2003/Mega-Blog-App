import envData from "../envData/envData.js"
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(envData.appwriteUrl)
            .setProject(envData.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.log("Appwrite service :: createAccount :: error :: ", error)
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            console.log("Appwrite service :: login :: error :: ", error)
        }
    }

    async getCurrentUser() {
        console.log(envData)
        console.log(envData.appwriteBucketId)
        console.log(envData.appwriteUrl)
        console.log(envData.appwriteProjectId)
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error :: ", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error :: ", error);
        }
    }
}

const authService = new AuthService();

export default authService