import { db } from "../../database";
import { IUser } from "../types/User";


async function storeUser(user: IUser): Promise<void> {
    try {
        const text = 'INSERT INTO users(name, type, location, bio, public_repos, followers, following) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
        const values = [user.name, user.type, user.location, user.bio, user.public_repos, user.followers, user.following]
        await db.query(text, values)
    } catch (error) {
        throw new Error(`Error fetching and storing user information: ${error.message}`);
    }
}

export { storeUser }