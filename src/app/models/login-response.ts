enum RoleEnum {
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_FARMER = 'ROLE_FARMER',
  ROLE_BUYER = 'ROLE_BUYER'
}

export interface LoginResponse {
  email?: string;
  token?: string;
  userId?: number;
  roles: RoleEnum[];
}
