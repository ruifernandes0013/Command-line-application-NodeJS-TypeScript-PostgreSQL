export interface IUserDetailsDTO {
  id?: number;
  name: string;
  type: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  languages: string[];
  created_at?: Date;
  updated_at?: Date;
}
