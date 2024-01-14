import { db } from "../database/Database";
import { getUsersDB, storeUserDB } from "../modules/User/repos/UserRepo";

jest.mock('../database/Database', () => ({
    db: {
        one: jest.fn(),
        manyOrNone: jest.fn(),
    },
}));

describe('User Repo tests', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('Store users', () => {
        describe('Should succedd to', () => {
            it('should store user successfully', async () => {
                const mockUser = {
                    name: 'John Doe',
                    type: 'User',
                    location: 'New York',
                    bio: 'Software Developer',
                    public_repos: 10,
                    followers: 100,
                    following: 50,
                };

                (db.one as jest.Mock).mockImplementation(() => Promise.resolve(mockUser));

                const result = await storeUserDB(mockUser);

                expect(db.one).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
                expect(result).toEqual(mockUser);
            });
            it('should throw an error on failure', async () => {
                const mockUser = {
                    name: 'John Doe',
                    type: 'User',
                    location: 'New York',
                    bio: 'Software Developer',
                    public_repos: 10,
                    followers: 100,
                    following: 50,
                };
                (db.one as jest.Mock).mockRejectedValueOnce(new Error('Mocked error during insertion'));
                await expect(storeUserDB(mockUser)).rejects.toThrowError('Failed storing user in database: Mocked error during insertion');
            });
        })
    })

    describe('Get Users', () => {
        afterEach(() => {
            jest.clearAllMocks();
        });

        describe('Should succedd to', () => {
            it('retrieve users successfully', async () => {
                const mockSearchParams = { location: 'New York', language: 'JavaScript' };

                (db.manyOrNone as jest.Mock).mockImplementation(() => Promise.resolve([]));

                const result = await getUsersDB(mockSearchParams);

                expect(db.manyOrNone).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
                expect(result).toEqual([]);
            });
            it('retrieve users successfully without passing params', async () => {
                expect(await getUsersDB({})).toEqual([])
            });
            it('throw an error on failure', async () => {
                const mockSearchParams = { location: 'New York', language: 'JavaScript' };
                (db.manyOrNone as jest.Mock).mockRejectedValueOnce(new Error('Mocked error during fetching'));
                await expect(getUsersDB(mockSearchParams)).rejects.toThrow('Failed getting users from database: Mocked error during fetching');
            });
        })
    });

});


