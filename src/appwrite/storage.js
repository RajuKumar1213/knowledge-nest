import conf from "../conf/conf";
import { Storage, ID, Client } from "appwrite";

export class AppwriteStorage {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.storage = new Storage(this.client);
  }

  uploadFile = async (file) => {
    try {
      const newFile = await this.storage.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
      if (newFile) {
        return newFile;
      }
      return false;
    } catch (error) {
      console.log("appwrite error :: upload file ::", error);
    }
  };

  // delete file
  deleteFile = async (fileId) => {
    try {
      await this.storage.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("appwrite error :: delete file ::", error);
    }
  };

  // getfile preview
  getFilePreview = (fileId) => {
    try {
      if (fileId) {
        return this.storage.getFilePreview(conf.appwriteBucketId, fileId);
      }
    } catch (error) {
      console.log("appwrite error :: get file preview ::", error);
      return false;
    }
  };
}

const appwriteStorage = new AppwriteStorage();
export default appwriteStorage;
