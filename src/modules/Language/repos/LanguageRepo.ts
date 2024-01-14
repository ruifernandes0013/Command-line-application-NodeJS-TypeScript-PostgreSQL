import { db } from '../../../database/Database'
import { IStoreLanguages } from '../dtos/IStoreLanguage'

/**
 * Stores user languages in the database, updating the timestamp if the entry already exists.
 *
 * @param {IStoreLanguages} params - An object containing userId and an array of languages.
 * @returns {Promise<string[]>} A promise that resolves to the stored or updated languages.
 * @throws {Error} Throws an error if storing or updating fails.
 */
async function storeLanguagesDB({
  userId,
  languages,
}: IStoreLanguages): Promise<string[]> {
  try {
    const insertQuery = `
            INSERT INTO userlanguages(userId, language)
            VALUES($1, $2)
            ON CONFLICT (userId, language)
            DO UPDATE SET updatedAt = CURRENT_TIMESTAMP `

    await Promise.all(
      languages.map((language: string) =>
        db.none(insertQuery, [userId, language]),
      ),
    )

    return languages
  } catch (error: any) {
    throw new Error(
      `Failed storing user languages in database: ${error.message}`,
    )
  }
}

export { storeLanguagesDB }
