import * as yargs from 'yargs'
import 'dotenv/config'
import {
  fetchAndStoreUserInformation,
  listAllUsers,
  listAllUsersByLanguage,
  listAllUsersByLocation,
} from './shared/services/GitHubService'
import logger from './shared/logger'

const argv = yargs
  .command(
    'fetch <username>',
    'Fetch and store user information',
    {},
    async (args: any) => {
      try {
        await fetchAndStoreUserInformation(args.username)
      } catch (error: any) {
        logger.error(error.message)
      }
    },
  )
  .command('list', 'List all users', {}, async () => {
    try {
      await listAllUsers()
    } catch (error: any) {
      logger.error(error.message)
    }
  })
  .command(
    'location <location>',
    'List users by location',
    {},
    async (args: any) => {
      try {
        await listAllUsersByLocation(args.location)
      } catch (error: any) {
        logger.error(error.message)
      }
    },
  )
  .command(
    'language <language>',
    'List users by language',
    {},
    async (args: any) => {
      try {
        await listAllUsersByLanguage(args.language)
      } catch (error: any) {
        logger.error(error.message)
      }
    },
  )
  .usage('Usage: npm run start <command> [options]')
  .demandCommand(1, 'You need at least one command before moving on')
  .help().argv
