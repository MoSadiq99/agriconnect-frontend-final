export interface UserRegisterDto {
  address: string;
  email: string;
  name: string;
  password: string;
  phone: string;
  roles: Array<string>;
  userType: string;
}
