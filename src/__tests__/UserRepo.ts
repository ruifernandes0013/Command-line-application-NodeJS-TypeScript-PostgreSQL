import { db, pgpInstance } from '../database/Database';
import {
  getUsersByLocationDB,
  getUsersDetailsDB,
  storeUserDB,
} from '../modules/User/repos/UserRepo';

jest.mock('../database/Database', () => ({
  db: {
    one: jest.fn(),
    manyOrNone: jest.fn(),
  },
  pgpInstance: {
    helpers: {
      insert: jest.fn(),
    },
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

        const mockInsert = jest.fn();
        (pgpInstance.helpers.insert as jest.Mock) = mockInsert;

        (db.one as jest.Mock).mockImplementation(() =>
          Promise.resolve(mockUser),
        );

        const result = await storeUserDB(mockUser);

        expect(mockInsert).toHaveBeenCalledWith(
          expect.objectContaining({
            name: mockUser.name,
            type: mockUser.type,
            location: mockUser.location,
            bio: mockUser.bio,
            publicrepos: mockUser.public_repos,
            followers: mockUser.followers,
            following: mockUser.following,
          }),
          null,
          'users',
        );
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
        (db.one as jest.Mock).mockRejectedValueOnce(
          new Error('Mocked error during insertion'),
        );
        await expect(storeUserDB(mockUser)).rejects.toThrow(
          'Failed storing user in database: Mocked error during insertion',
        );
      });
    });
  });

  describe('Get Users', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    describe('Should succedd to', () => {
      it('retrieve users successfully', async () => {
        const mockSearchParams = 'New York';

        (db.manyOrNone as jest.Mock).mockImplementation(() =>
          Promise.resolve([]),
        );

        const result = await getUsersByLocationDB(mockSearchParams);

        expect(db.manyOrNone).toHaveBeenCalledWith(
          expect.any(String),
          expect.any(String),
        );
        expect(result).toEqual([]);
      });
      it('retrieve users successfully without passing params', async () => {
        expect(await getUsersDetailsDB()).toEqual([]);
      });
      it('throw an error on failure', async () => {
        const mockSearchParams = 'JavaScript';

        (db.manyOrNone as jest.Mock).mockRejectedValueOnce(
          new Error('Mocked error during fetching'),
        );
        await expect(getUsersDetailsDB(mockSearchParams)).rejects.toThrow(
          // eslint-disable-next-line max-len
          'Failed getting users details from database: Mocked error during fetching',
        );
      });
    });
  });
});
