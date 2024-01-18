import { db, pgpInstance } from '../../../database/Database';
import { IUserDTO } from '../dtos/IUserDTO';
import { IUserDetailsDTO } from '../dtos/IUserDetailsDTO';

/**
 * Stores user information in the database, updating if the user already exists.
 *
 * @param {IUserDTO} user - The user object to store.
 * @returns {Promise<IUserDTO>} A promise that resolves the stored/updated user.
 * @throws {Error} Throws an error if storing or updating fails.
 */
async function storeUserDB(user: IUserDTO): Promise<IUserDTO> {
  try {
    const data = {
      name: user.name,
      type: user.type,
      location: user.location,
      bio: user.bio,
      publicrepos: user.public_repos,
      followers: user.followers,
      following: user.following,
    };

    let query = pgpInstance.helpers.insert(data, null, 'users');
    query += ` ON CONFLICT (name) DO UPDATE SET 
    type = EXCLUDED.type,
    location = EXCLUDED.location,
    bio = EXCLUDED.bio,
    publicRepos = EXCLUDED.publicRepos,
    followers = EXCLUDED.followers,
    following = EXCLUDED.following,
    updatedAt = CURRENT_TIMESTAMP
  RETURNING *`;

    const result = await db.one(query);
    return result as IUserDTO;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed storing user in database: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

/**
 * Retrieves users details from the database.
 *
 *  @param {string} language- Search by a language
 * @returns {Promise<IUserDTO[]>} Resolves a list of users details
 * @throws {Error} Throws an error if fetching users fails.
 */
async function getUsersDetailsDB(
  language?: string,
): Promise<IUserDetailsDTO[]> {
  try {
    const values = language ? [`%${language.toLowerCase()}%`] : [];
    const query = `
      SELECT
        u.id,
        u.name,
        u.type,
        u.location,
        u.bio,
        u.publicRepos,
        u.followers,
        u.following,
        u.createdAt,
        u.updatedAt,
        ARRAY_AGG(ul.language) AS languages
      FROM
        Users u
      INNER JOIN
        UserLanguages ul ON u.id = ul.userId
        ${language ? 'AND LOWER(language) LIKE LOWER($1)' : ''}
      GROUP BY
        u.id;
    `;
    const result = await db.manyOrNone(query, values);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Failed getting users details from database: ${error.message}`,
      );
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

/**
 * Retrieves users from the database based on the location
 *
 * @param {string} location- Search by a location
 * @returns {Promise<IUserDTO[]>} A promise that resolves an array of users
 * @throws {Error} Throws an error if fetching users fails.
 */
async function getUsersByLocationDB(location: string): Promise<IUserDTO[]> {
  try {
    const values = `%${location}%`;

    const query = `
      SELECT *
      FROM Users
      WHERE LOWER(location) LIKE LOWER($1)
      `;

    const result = await db.manyOrNone(query, values);
    return result;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed getting users from database: ${error.message} `);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

export { storeUserDB, getUsersByLocationDB, getUsersDetailsDB };
