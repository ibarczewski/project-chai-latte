export interface GetUserOutput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  fullName: string;
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
}
