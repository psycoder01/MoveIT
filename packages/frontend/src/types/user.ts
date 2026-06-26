export interface User {
  id: string;
  email: string;
  username: string;
  password_hash: string;
  full_name: string | null;
  avatar_url: string | null;
  timezone: string | null;
  is_active: boolean;
  last_login_at: string;
  created_at: string;
  updated_at: string;
}
