import * as yargs from 'yargs'
import 'dotenv/config'
import {
  fetchAndStoreUser,
  listAllUsers,
} from './shared/services/GitHubService'

const argv = yargs
  .command(
    'fetch <username>',
    'Fetch and store user information',
    {},
    async (args: any) => {
      await fetchAndStoreUser(args.username)
    },
  )
  .command('list', 'List all users', {}, () => listAllUsers())
  .command('location <location>', 'List users by location', {}, (args: any) =>
    listAllUsers(args.location),
  )
  // .command('listLanguages <username>', 'List languages by user', {}, (args) => listLanguagesByUser(args.username))
  .demandCommand()
  .help().argv
