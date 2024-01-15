import { IUser } from '../../modules/User/dtos/IUser';
import logger from '../logger';

function validateUser(user: IUser): void {
  const missingProperties = [];
  if (!user.name) missingProperties.push('name');
  if (!user.location) missingProperties.push('location');
  if (missingProperties.length)
    throw new Error(
      `Missing properties in [ValidateUser]: ${missingProperties.join(', ')}`,
    );
}

function extractProgrammingLanguages(repositories: []) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return repositories.reduce((acc: string[], repo: any) => {
      if (repo.language && !acc.includes(repo.language)) {
        acc.push(repo.language);
      }
      return acc;
    }, []);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed reading programming languages: ${error.message}`);
    } else {
      throw new Error(`An unknown error occurred: ${error}`);
    }
  }
}

function handleError(error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error(`An unknown error occurred: ${error}`);
  }
}

export { validateUser, extractProgrammingLanguages, handleError };
