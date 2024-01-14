import { db } from "../database/Database";
import { storeLanguagesDB } from "../modules/Language/repos/LanguageRepo";

jest.mock('../database/Database', () => ({
    db: {
        none: jest.fn(),
    },
}));

describe('Language Repo tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Should succedd to ', () => {
        it('store languages successfully', async () => {
            const mockUserId = 1123;
            const mockLanguages = ['JavaScript', 'TypeScript'];

            await storeLanguagesDB({ userId: mockUserId, languages: mockLanguages });

            expect(db.none).toHaveBeenCalledTimes(mockLanguages.length);
            mockLanguages.forEach((language, index) => {
                expect(db.none).toHaveBeenCalledWith(expect.any(String), [mockUserId, language]);
            });
        });

        it('update existing entry', async () => {
            const mockUserId = 123;
            const mockLanguages = ['JavaScript', 'TypeScript'];

            (db.none as jest.Mock).mockImplementation(() => Promise.resolve(null));

            await storeLanguagesDB({ userId: mockUserId, languages: mockLanguages });

            expect(db.none).toHaveBeenCalledTimes(mockLanguages.length);
            mockLanguages.forEach((language, index) => {
                expect(db.none).toHaveBeenCalledWith(expect.any(String), [mockUserId, language]);
            });
        });
        it('throw an error on failure', async () => {
            const mockUserId = 123;
            const mockLanguages = ['JavaScript', 'TypeScript'];

            (db.none as jest.Mock).mockRejectedValueOnce(new Error('Mocked error during insertion'));

            await expect(storeLanguagesDB({ userId: mockUserId, languages: mockLanguages }))
                .rejects.toThrow('Failed storing user languages in database: Mocked error during insertion');
        });
    })

});
