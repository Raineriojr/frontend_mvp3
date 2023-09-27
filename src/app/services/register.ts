import { BASE_URL } from './config';

interface RegisterProps {
  name: string;
  email: string;
  password: string;
}

export const register = async (data: RegisterProps): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })

    return response

  } catch (error: any) {
    console.error('Falha ao cadastrar usuário', error);
    return error
  }
}