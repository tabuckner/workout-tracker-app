export interface AuthData {
  userId: string
  token: string;
  expiresIn: Date;
}

export interface AuthResponse {
  message: string;
  userId: string
  token: string;
  expiresIn: number;
}
