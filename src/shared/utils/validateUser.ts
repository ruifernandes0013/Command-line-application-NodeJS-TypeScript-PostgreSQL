import { type IUser } from '../../modules/User/dtos/User'

function validateUser(user: IUser): void {
  const missingProperties = []
  if (!user.name) missingProperties.push('name')
  if (!user.location) missingProperties.push('location')
  if (missingProperties.length)
    throw new Error(
      `Missing properties in [ValidateUser]: ${missingProperties.join(', ')}`,
    )
}
export { validateUser }
