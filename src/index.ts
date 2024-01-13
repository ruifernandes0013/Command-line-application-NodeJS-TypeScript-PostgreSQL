import * as yargs from 'yargs';
import 'dotenv/config'
import { fetchAndStoreUser } from './shared/utils/githubApi';

const argv = yargs
    .command('fetch <username>', 'Fetch and store user information', {}, async (args) => await fetchAndStoreUser(args.username))
    // .command('list', 'List all users', {}, () => listAllUsers())
    // .command('listByLocation <location>', 'List users by location', {}, (args) => listUsersByLocation(args.location))
    // .command('listLanguages <username>', 'List languages by user', {}, (args) => listLanguagesByUser(args.username))
    .demandCommand()
    .help()
    .argv;
