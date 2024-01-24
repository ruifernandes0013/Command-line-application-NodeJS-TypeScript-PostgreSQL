import * as yargs from 'yargs';
import 'dotenv/config';
import {
  fetchAndStoreUserInformation,
  listAllUsers,
  listAllUsersByLocation,
} from './shared/services/GitHubService';
import { handleError } from './shared/utils/Utils';

interface FetchCommandArgs {
  username: string;
}

interface LocationCommandArgs {
  location: string;
}

interface LanguageCommandArgs {
  language: string;
}

yargs
  .command<FetchCommandArgs>(
    'fetch <username>',
    'Fetch and store user information',
    (yargs) => {
      return yargs;
    },
    async (args) => {
      try {
        await fetchAndStoreUserInformation(args.username);
      } catch (error: unknown) {
        handleError(error);
      }
    },
  )
  .command('list', 'List all users', {}, async () => {
    try {
      await listAllUsers();
    } catch (error: unknown) {
      handleError(error);
    }
  })
  .command<LocationCommandArgs>(
    'location <location>',
    'List users by location',
    (yargs) => {
      return yargs;
    },
    async (args) => {
      try {
        await listAllUsersByLocation(args.location);
      } catch (error: unknown) {
        handleError(error);
      }
    },
  )
  .command<LanguageCommandArgs>(
    'language <language>',
    'List users by language',
    (yargs) => {
      return yargs;
    },
    async (args) => {
      try {
        await listAllUsers(args.language);
      } catch (error: unknown) {
        handleError(error);
      }
    },
  )
  .usage('Usage: npm run start <command> [options]')
  .demandCommand(1, 'You need at least one command before moving on')
  .help().argv;
