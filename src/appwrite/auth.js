import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

// MAKING AUTH SERVICE
export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.account = new Account(this.client);
  }

  createAccount = async ({ email, password, name }) => {
    try {
      const user = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (user) {
        // call another method.
        return this.login({ email, password });
      }
    } catch (error) {
      console.log("Appwrite error :: create account error :: ", error);
    }
  };

  login = async ({ email, password }) => {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      // throw error;
      console.log("Appwrite error :: login error :: ", error);
    }
  };

  logout = async () => {
    try {
      await this.account.deleteSession("current");
      return true;
    } catch (error) {
      console.log("Appwrite error :: logout error :: ", error);
      return false;
    }
  };

  getCurrentUser = async () => {
    try {
      return await this.account.get();
    } catch (error) {
      console.log("Appwrite error :: get current user error :: ", error);
    }
    return null;
  };
}
const authService = new AuthService();
export default authService;