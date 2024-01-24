import axios from 'axios';
import {
  fetchProgrammingLanguages,
  fetchUser,
} from '../shared/services/GitHubService';
import { extractProgrammingLanguages } from '../shared/utils/Utils';

jest.mock('axios');
jest.mock('../shared/utils/Utils', () => ({
  extractProgrammingLanguages: jest.fn(),
}));

describe('GitHub Service tests', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Fetch User tests', () => {
    describe('Should succedd to ', () => {
      it('fetch user information successfully', async () => {
        const mockUsername = 'testuser';
        const mockUser = {
          name: 'Rui',
          bio: 'I love programming',
          followers: 10,
          following: 10,
          location: 'Braga',
          public_repos: 2,
          type: 'User',
        };

        (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockUser });
        const result = await fetchUser(mockUsername);
        expect(axios.get).toHaveBeenCalledWith(
          `https://api.github.com/users/${mockUsername}`,
        );
        expect(result).toEqual(mockUser);
      });

      it('throw an error if fetching fails', async () => {
        const mockUsername = 'testuser';

        (axios.get as jest.Mock).mockRejectedValueOnce(
          new Error('Failed to fetch user'),
        );

        await expect(fetchUser(mockUsername)).rejects.toThrow(
          'Failed fetching user from github: Failed to fetch user',
        );
        expect(axios.get).toHaveBeenCalledWith(
          `https://api.github.com/users/${mockUsername}`,
        );
      });
    });
  });

  describe('Fetch Programming Languages tests', () => {
    describe('Should succedd to ', () => {
      it('fetch languages successfully', async () => {
        const mockUsername = 'testuser';
        const mockLanguages = { data: ['Python'] };

        (axios.get as jest.Mock).mockImplementation(() =>
          Promise.resolve(mockLanguages),
        );

        (extractProgrammingLanguages as jest.Mock).mockImplementation(() =>
          Promise.resolve(mockLanguages.data),
        );

        const result = await fetchProgrammingLanguages(mockUsername);
        expect(axios.get).toHaveBeenCalledWith(
          `https://api.github.com/users/${mockUsername}/repos`,
        );
        expect(result).toEqual(mockLanguages.data);
      });
      it('throw an error if fetching fails', async () => {
        const mockUsername = 'testuser';

        (axios.get as jest.Mock).mockRejectedValueOnce(
          new Error('Failed to fetch repos'),
        );

        await expect(fetchProgrammingLanguages(mockUsername)).rejects.toThrow(
          'Failed to fetch repos',
        );
        expect(axios.get).toHaveBeenCalledWith(
          `https://api.github.com/users/${mockUsername}/repos`,
        );
      });
    });
  });
});
