export interface CreateOrUpdateUserInput {
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleNames: string[];
  password: string;
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
  isPrivate: boolean;
  
}
