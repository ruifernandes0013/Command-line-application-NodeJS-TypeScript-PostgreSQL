import { type IUser } from '../../modules/User/dtos/IUser'

function validateUser(user: IUser): void {
  const missingProperties = []
  if (!user.name) missingProperties.push('name')
  if (!user.location) missingProperties.push('location')
  if (missingProperties.length)
    throw new Error(
      `Missing properties in [ValidateUser]: ${missingProperties.join(', ')}`,
    )
}

function extractProgrammingLanguages(repositories: []) {
  try {
    return repositories.reduce((acc: string[], repo: any) => {
      if (repo.language && !acc.includes(repo.language)) {
        acc.push(repo.language)
      }
      return acc
    }, [])
  } catch (error: any) {
    throw new Error(`Failed reading programming languages: ${error.message}`)
  }
}

export { validateUser, extractProgrammingLanguages }
