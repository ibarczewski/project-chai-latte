export interface GetAllUserOutput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
  lastLoginTime: Date;
  creationTime: Date;
  roleNames: string[];
  id: number;
  userImage: string;
  userImageType: string;
  UserImageName: string;
  referrelCode: string;
  drinkPreferenceId: number;
  drinkLogPreferenceId: number;
  newPassword: string;
  ImageData: string | null;
  ImageName: string | null;
  IsPrivate: boolean;
}
