import { BASE_URL } from './config';

interface LoginProps {
  email: String;
  password: String;
}

export const login = async (data: LoginProps) => {  
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    
    return response

  } catch (error: any) {
    console.error('Falha ao realizar login', error);
    return error
  }
}