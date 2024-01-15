/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from '../modules/User/dtos/IUser';
import {
  extractProgrammingLanguages,
  validateUser,
} from '../shared/utils/Utils';

describe('Validate User tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('It should succeed to', () => {
    it('Validate a valid user', async () => {
      const mockUser: IUser = {
        name: 'Rui',
        bio: 'I love programming',
        followers: 10,
        following: 10,
        location: 'Braga',
        public_repos: 2,
        type: 'User',
      };
      expect(() => validateUser(mockUser)).not.toThrow();
    });
  });

  describe('It should fail to', () => {
    it('validate a user without name', () => {
      const mockUser: IUser = {
        name: null as any,
        bio: 'I love programming',
        followers: 10,
        following: 10,
        location: 'Braga',
        public_repos: 2,
        type: 'User',
      };

      expect(() => validateUser(mockUser)).toThrow(
        'Missing properties in [ValidateUser]: name',
      );
    });

    it('validate a user without location', () => {
      const mockUser: IUser = {
        name: 'Rui',
        bio: 'I love programming',
        followers: 10,
        following: 10,
        location: null as any,
        public_repos: 2,
        type: 'User',
      };

      // Should throw an error
      expect(() => validateUser(mockUser)).toThrow(
        'Missing properties in [ValidateUser]: location',
      );
    });

    it('validate a user without name and location', () => {
      const mockUser: IUser = {
        name: null as any,
        bio: 'I love programming',
        followers: 10,
        following: 10,
        public_repos: 2,
        location: null as any,
        type: 'User',
      };

      // Should throw an error
      expect(() => validateUser(mockUser)).toThrow(
        'Missing properties in [ValidateUser]: name, location',
      );
    });

    it('validate a user with an empty string for the name', () => {
      const mockUser: IUser = {
        name: '',
        bio: 'I love programming',
        followers: 10,
        following: 10,
        location: 'Braga',
        public_repos: 2,
        type: 'User',
      };

      expect(() => validateUser(mockUser)).toThrow(
        'Missing properties in [ValidateUser]: name',
      );
    });

    it('validate a user with an empty string for the location', () => {
      const mockUser: IUser = {
        name: 'Rui',
        bio: 'I love programming',
        followers: 10,
        following: 10,
        location: '',
        public_repos: 2,
        type: 'User',
      };
      expect(() => validateUser(mockUser)).toThrow(
        'Missing properties in [ValidateUser]: location',
      );
    });
  });
});

describe('Extract Programming Languages tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('It should succeed to', () => {
    it('extract programming languages from repositories', () => {
      const mockRepositories = [
        { language: 'JavaScript' },
        { language: 'Python' },
        { language: 'JavaScript' },
        { language: 'TypeScript' },
      ];
      const result = extractProgrammingLanguages(mockRepositories as []);

      expect(result).toEqual(['JavaScript', 'Python', 'TypeScript']);
    });

    it('extract programming languages from empty repositories', () => {
      const mockRepositories: any[] = [];
      const result = extractProgrammingLanguages(mockRepositories as []);
      expect(result).toEqual([]);
    });

    it('handle errors during extraction', () => {
      const mockRepositories = [
        { language: 'JavaScript' },
        { language: 'Python' },
        { language: 'JavaScript' },
        { language: 'TypeScript' },
      ];

      jest.spyOn(mockRepositories, 'reduce').mockImplementation(() => {
        throw new Error('Mocked error during extraction');
      });

      expect(() => extractProgrammingLanguages(mockRepositories as [])).toThrow(
        'Failed reading programming languages: Mocked error during extraction',
      );
    });
  });

  describe('It should fail to', () => {
    it('extracting null values', () => {
      expect(() => extractProgrammingLanguages(null as any)).toThrow(
        // eslint-disable-next-line quotes, max-len
        `Failed reading programming languages: Cannot read properties of null (reading 'reduce')`,
      );
    });
    it('extracting undefined values', () => {
      expect(() => extractProgrammingLanguages(undefined as any)).toThrow(
        // eslint-disable-next-line quotes, max-len
        `Failed reading programming languages: Cannot read properties of undefined (reading 'reduce')`,
      );
    });
    it('extracting an array of numbers', () => {
      const mockRepositories = [1, 2];
      const result = extractProgrammingLanguages(mockRepositories as []);
      expect(result).toEqual([]);
    });
    it('extracting an array of strings', () => {
      const mockRepositories = ['1', '2'];
      const result = extractProgrammingLanguages(mockRepositories as []);
      expect(result).toEqual([]);
    });
  });
});
