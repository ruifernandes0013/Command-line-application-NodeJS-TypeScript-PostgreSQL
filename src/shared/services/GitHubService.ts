import axios from 'axios'
import { getUsersDB, storeLanguagesDB, storeUserDB } from '../../modules/User/repos/UserRepo'
import { extractProgrammingLanguages, validateUser } from '../utils/Utils'
import { type IUser } from '../../modules/User/dtos/User'

async function fetchAndStoreUserInformation(username: string): Promise<void> {
  try {
    const user = await fetchUser(username)
    validateUser(user as IUser)
    const result = await storeUserDB(user as IUser)

    const languages = await fetchProgrammingLanguages(username)
    if (languages.length > 0) await storeLanguagesDB({ userId: result.id!, languages })

    languages.length > 0 ? console.log(`User created: ${result.id}, with languages: ${languages}`) : console.log(`User created: ${result}`)
  } catch (error) {
    console.error(error)
  }
}
async function fetchUser(username: string) {
  try {
    const url = `https://api.github.com/users/${username}`
    const response = await axios.get(url)
    return response.data
  } catch (error: any) {
    throw new Error(`Error fetching user: ${error.message}`);
  }

}
async function fetchProgrammingLanguages(username: string): Promise<string[]> {
  try {
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);
    return extractProgrammingLanguages(reposResponse.data)
  } catch (error: any) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`Error fetching languages: ${error.message}`);
    }
  }
}

async function listAllUsers(): Promise<void> {
  try {
    const users = await getUsersDB({})
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
async function listAllUsersByLocation(location: string): Promise<void> {
  try {
    const users = await getUsersDB({ location })
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
async function listAllUsersByLanguage(language: string): Promise<void> {
  try {
    const users = await getUsersDB({ language })
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

export { fetchAndStoreUserInformation, listAllUsers, listAllUsersByLocation, listAllUsersByLanguage }



