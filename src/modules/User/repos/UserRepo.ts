import { db } from '../../../database/Database'
import { IUser } from '../dtos/User'

export interface IStoreLanguages {
  userId: number
  languages: string[]
}
export interface IParams {
  location?: string, language?: string
}

async function storeUserDB(user: IUser): Promise<IUser> {
  try {
    const text =
      'INSERT INTO users(name, type, location, bio, publicRepos, followers, following) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [
      user.name,
      user.type,
      user.location,
      user.bio,
      user.public_repos,
      user.followers,
      user.following,
      new Date(),
      null
    ]
    const result = await db.one(text, values)
    return result as IUser
  } catch (error: any) {
    throw new Error(
      `Error fetching and storing user information: ${error.message}`,
    )
  }
}
async function getUsersDB(params: IParams): Promise<IUser[]> {
  try {
    let text = 'SELECT * FROM Users';
    const values: any[] = [];

    if (params.location) {
      text += ' WHERE LOWER(location) LIKE LOWER($1)';
      values.push(`%${params.location}%`);
    }

    if (params.language) {
      text += ' INNER JOIN UserLanguages ON Users.id = UserLanguages.userId AND LOWER(language) LIKE LOWER($1)';
      values.push(`%${params.language}%`);
    }

    const result = await db.manyOrNone(text, values);
    return result;
  } catch (error: any) {
    throw new Error(`Error listing users: ${error.message}`);
  }
}

async function storeLanguagesDB({ userId, languages }: IStoreLanguages): Promise<string[]> {
  try {
    const insertQuery = 'INSERT INTO userlanguages(userId,language) VALUES($1, $2) ';

    await Promise.all(languages.map(language =>
      db.none(insertQuery, [userId, language])
    ));

    return languages;
  } catch (error: any) {
    throw new Error(`Error storing languages: ${error.message}`);
  }
}

export { storeUserDB, getUsersDB, storeLanguagesDB }
