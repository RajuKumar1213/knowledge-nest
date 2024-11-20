import conf from "../conf/conf";
import { Databases, Client, Query } from "appwrite"

// MAKING SERVICES FOR POST RELATED TASK

export class AppwriteService {
    client = new Client();
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    createPost = async ({ title, slug, content, featuredImage, status, userId }) => {
        try {
            const post = await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColletionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );

            if (post) {
                return post;
            }
            return false;
        } catch (error) {
            console.log("Appwrite error :: create post error :: ", error);
        }
    }

    // update document

    updatePost = async (slug, { title, content, featuredImage, status }) => {
        try {
            const post = await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColletionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
            if (post) {
                return true;
            }
            return false;
        } catch (error) {
            console.log("appwrite error :: update post ::", error);
        }
    }

    // delete post 

    deletePost = async ({ slug }) => {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColletionId,
                slug
            )

            return true;

        } catch (error) {
            console.log("appwrite error :: delete post ::", error);
        }
    }

    // get all posts

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            const posts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteColletionId,
                queries
            )
            if (posts) {
                return posts;
            }
            return false;
        } catch (error) {
            console.log("appwrite error :: get all posts ::", error);
            return false;
        }
    }
    getPost = async ({ slug }) => {
        try {
            const posts = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteColletionId,
                slug
            )
            if (posts) {
                return posts;
            }
            return false;
        } catch (error) {
            console.log("appwrite error :: get posts ::", error);
        }
    }
}

const appwriteService = new AppwriteService();

export default appwriteService;