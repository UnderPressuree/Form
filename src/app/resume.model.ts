export interface IResume{
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  framework: string;
  frameworkVersion: string;
  email: string;
  hobby: IHobby[];
}

export interface IHobby {
  name: string;
  duration: string;
}
