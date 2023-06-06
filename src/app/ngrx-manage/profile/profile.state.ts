export interface IUserProfile {
  name: string;
  email: string;
  createdBy: string;
  loggedInAt: string;
  organization: string;
  role: string;
  token: string;
  username: string;
}

export class UserProfile {
  name: string = '';
  email: string = '';
  createdBy: string = '';
  loggedInAt: string = '';
  organization: string = '';
  role: string = '';
  token: string = '';
  username: string = '';
}

export const initialUserProfileState: IUserProfile = new UserProfile();