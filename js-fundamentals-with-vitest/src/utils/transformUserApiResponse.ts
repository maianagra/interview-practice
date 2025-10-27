export interface NormalizedUser {
  id: number;
  name: string;
  email: string;
}

export function transformUserApiResponse(apiUsers: any[]): NormalizedUser[] {
  return apiUsers.map((user) => ({
    id: user.user_id,
    name: user.full_name,
    email: user.mail,
  }));
}
