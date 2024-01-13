import axios from 'axios'
import { getUsers, storeUser } from '../../modules/User/repos/UserRepo'
import { validateUser } from '../utils/ValidateUser'
import { type IUser } from '../../modules/User/dtos/User'

async function fetchAndStoreUser(username: string): Promise<void> {
  try {
    const url = `https://api.github.com/users/${username}`
    const response = await axios.get(url)
    const user = response.data

    validateUser(user as IUser)
    await storeUser(user as IUser)
  } catch (error) {
    console.error(error)
  }
}
async function listAllUsers(location?: string): Promise<void> {
  try {
    const users = await getUsers(location)
    if (users.length === 0) {
      console.log('No data found')
    } else {
      users.forEach((user: IUser) => {
        console.log(user)
      })
    }
  } catch (error) {
    console.error(error)
  }
}

export { fetchAndStoreUser, listAllUsers }
