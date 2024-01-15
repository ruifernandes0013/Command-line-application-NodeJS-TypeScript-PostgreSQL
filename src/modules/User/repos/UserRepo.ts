import { db } from '../../../database/Database';
import { IUser } from '../dtos/IUser';
import { IUserSearchParams } from '../dtos/IUserSearchParams';

/**
 * Stores user information in the database, updating if the user already exists.
 *
 * @param {IUser} user - The user object to store.
 * @returns {Promise<IUser>} A promise that resolves the stored or updated user.
 * @throws {Error} Throws an error if storing or updating fails.
 */
async function storeUserDB(user: IUser): Promise<IUser> {
  try {
    const text = `INSERT INTO users
      (name, type, location, bio, publicRepos, followers,
       following, createdAt, updatedAt)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (name) 
       DO UPDATE SET type = $2, location = $3, bio = $4,
       publicRepos = $5, followers = $6, following = $7,
       updatedAt = CURRENT_TIMESTAMP RETURNING *`;

    const values = [
      user.name,
      user.type,
      user.location,
      user.bio,
      user.public_repos,
      user.followers,
      user.following,
      new Date(),
      null,
    ];
    const result = await db.one(text, values);
    return result as IUser;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed storing user in database: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

/**
 * Retrieves users from the database based on optional search parameters.
 *
 * @param {IUserSearchParams} params - Search parameters (location, language).
 * @returns {Promise<IUser[]>} A promise that resolves an array of users
 * @throws {Error} Throws an error if fetching users fails.
 */
async function getUsersDB(params: IUserSearchParams): Promise<IUser[]> {
  try {
    let text = 'SELECT * FROM Users';
    const values: string[] = [];

    if (params.location) {
      text += ' WHERE LOWER(location) LIKE LOWER($1)';
      values.push(`%${params.location}%`);
    }

    if (params.language) {
      text += ` INNER JOIN UserLanguages
         ON Users.id = UserLanguages.userId AND LOWER(language) LIKE LOWER($1)`;
      values.push(`% ${params.language}% `);
    }

    const result = await db.manyOrNone(text, values);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed getting users from database: ${error.message} `);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

export { storeUserDB, getUsersDB };
