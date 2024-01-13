import axios from 'axios';
import { storeUser } from '../repos/UserRepo';
import { validateUser } from './validateUser';

async function fetchAndStoreUser(username: string): Promise<void> {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    const user = response.data;

    validateUser(user)
    await storeUser(user)

  } catch (error) {
    console.error(error);
  }
}


export { fetchAndStoreUser };
