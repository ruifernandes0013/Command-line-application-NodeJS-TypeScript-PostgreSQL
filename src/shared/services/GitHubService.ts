import axios from 'axios';
import {
  getUsersDetailsDB,
  getUsersByLocationDB,
  storeUserDB,
} from '../../modules/User/repos/UserRepo';
import { extractProgrammingLanguages, validateUser } from '../utils/Utils';
import { type IUserDTO } from '../../modules/User/dtos/IUserDTO';
import logger from '../logger';
// eslint-disable-next-line max-len
import { storeUserLanguagesDB } from '../../modules/UserLanguage/repos/UserLanguageRepo';

/**
 * Fetches user information from GitHub and stores it in the database.
 *
 * @param {string} username - The GitHub username to fetch.
 * @throws {Error} Throws an error if fetching or storing fails.
 */
async function fetchAndStoreUserInformation(username: string): Promise<void> {
  const user = await fetchUser(username);
  validateUser(user as IUserDTO);
  const result = await storeUserDB(user as IUserDTO);

  const languages = await fetchProgrammingLanguages(username);
  if (languages.length > 0)
    await storeUserLanguagesDB({ userId: result.id!, languages });

  languages.length > 0
    ? logger.info(`User saved: ${result.id}, with languages: ${languages}`)
    : logger.info(`User saved: ${result.id}`);
}

/**
 * Lists users in the database.
 *
 * @param {string} language - The programming language to filter users by.
 * @throws {Error} Throws an error if listing users fails.
 */
async function listAllUsers(language?: string): Promise<void> {
  const users = await getUsersDetailsDB(language);
  if (users.length === 0) {
    logger.info('No data found');
  } else {
    users.forEach((user: IUserDTO) => {
      logger.log(user);
    });
  }
}

/**
 * Lists users in the database based on the specified location.
 *
 * @param {string} location - The location to filter users by.
 * @throws {Error} Throws an error if listing users fails.
 */
async function listAllUsersByLocation(location: string): Promise<void> {
  const users = await getUsersByLocationDB(location);
  if (users.length === 0) {
    logger.info('No data found');
  } else {
    users.forEach((user: IUserDTO) => {
      logger.log(user);
    });
  }
}

/**
 * Fetches user information from the GitHub API.
 *
 * @param {string} username - The GitHub username to fetch.
 * @returns {Promise<IUserDTO>} A promise that resolves the fetched user
 * @throws {Error} Throws an error if fetching fails.
 */
async function fetchUser(username: string): Promise<IUserDTO> {
  try {
    const url = `https://api.github.com/users/${username}`;
    const response = await axios.get(url);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed fetching user from github: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

/**
 * Fetches programming languages associated with a GitHub user.
 *
 * @param {string} username - The GitHub username.
 * @returns {Promise<string[]>} A promise that resolves an array of languages.
 * @throws {Error} Throws an error if fetching fails.
 */
async function fetchProgrammingLanguages(username: string): Promise<string[]> {
  try {
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos`,
    );

    return extractProgrammingLanguages(reposResponse.data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Failed fetching or processing languages: ${error.message}`,
      );
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

export {
  fetchAndStoreUserInformation,
  listAllUsers,
  listAllUsersByLocation,
  fetchUser,
  fetchProgrammingLanguages,
};
