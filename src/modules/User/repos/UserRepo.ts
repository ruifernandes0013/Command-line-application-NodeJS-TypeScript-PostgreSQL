import { db } from '../../../database/Database'
import { IUser } from '../dtos/User'

async function storeUser(user: IUser): Promise<void> {
  try {
    const text =
      'INSERT INTO users(name, type, location, bio, public_repos, followers, following) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *'
    const values = [
      user.name,
      user.type,
      user.location,
      user.bio,
      user.public_repos,
      user.followers,
      user.following,
    ]
    const result = await db.one(text, values)
    console.log('Data inserted successfully:', result)
  } catch (error: any) {
    throw new Error(
      `Error fetching and storing user information: ${error.message}`,
    )
  }
}
async function getUsers(location?: string): Promise<IUser[]> {
  try {
    const text = location
      ? 'SELECT * FROM Users WHERE location LIKE $1'
      : 'SELECT * FROM Users'
    const values = location ? [`%${location}%`] : null

    const result = await db.manyOrNone(text, values)
    return result
  } catch (error: any) {
    throw new Error(`Error listing users: ${error.message}`)
  }
}

export { storeUser, getUsers }
