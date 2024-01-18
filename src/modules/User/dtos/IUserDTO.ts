export interface IUserDTO {
  id?: number;
  name: string;
  type: string;
  location: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at?: Date;
  updated_at?: Date;
}
