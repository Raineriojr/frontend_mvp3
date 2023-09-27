import { BASE_URL } from './config';

export const getFakeUsers: any = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users_list`, {
      method: 'GET',
      headers: { 'Content-type': 'application/json' },
    })

    if (!response.ok) {
      throw new Error('Falha ao carregar lista de usuários');
    }

    const data = await response.json();

    return data;

  } catch (error: any) {
    throw new Error(`Falha ao carregar lista de usuários: ${error}`);
  }
}