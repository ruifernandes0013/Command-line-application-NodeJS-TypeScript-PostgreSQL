import * as yargs from 'yargs'
import 'dotenv/config'
import {
  fetchAndStoreUserInformation,
  listAllUsers,
  listAllUsersByLanguage,
  listAllUsersByLocation,
} from './shared/services/GitHubService'

const argv = yargs
  .command(
    'fetch <username>',
    'Fetch and store user information',
    {},
    async (args: any) => {
      await fetchAndStoreUserInformation(args.username)
    },
  )
  .command('list', 'List all users', {}, () => listAllUsers())
  .command('location <location>', 'List users by location', {}, (args: any) =>
    listAllUsersByLocation(args.location),
  )
  .command('language <language>', 'List users by language', {}, (args: any) => {
    listAllUsersByLanguage(args.language)
  })
  .demandCommand()
  .help().argv
