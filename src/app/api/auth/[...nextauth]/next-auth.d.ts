import { type DefaultSession, type DefaultUser, type User } from 'next-auth';
import { type DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface User extends DefaultUser {
    accessToken: string;
    detail: {
      address: string;
      avatar_url: string;
      birth_of_date: string;
      description: string | null;
      donations_count: number | null;
      donations_sum_amount: number | null;
      email: string;
      facebook: string | null;
      gender: string;
      id: number;
      name: string;
      phone_number: string;
      projects_count: number | null;
      projects_donations_count: number;
      projects_donations_sum_amount: number;
      status: number;
      status_badge: string;
      status_label: string;
      tiktok: string | null;
      type: string;
      username: string;
      volunteers_without_canceled_count: number | null;
      youtube: string | null;
    };
  }

  interface Session extends DefaultSession {
    user: User;
    accessToken: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, User {
    expired: number;
  }
}
