export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignUpCredentials extends LoginCredentials {
  email: string;
  firstName: string;
  lastName: string;
}

export interface LoginResponse {}
export interface SignUpResponse {}
