import { BASE_URL } from './config';
import { createFriendProps } from './types';

//** Lista amigos cadastrados */
export const getFriendList = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/friends_list`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${id}`
      },
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

//** Lista amigos cadastrados */
export const addFriend = async (data: createFriendProps, id: number): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/friends/create`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${id}`,
      },
      body: JSON.stringify(data)
    })

    return response

  } catch (error: any) {
    console.error('Falha ao adicionar amigo', error);
    return error
  }
}

//** Remove amigo da lista de amigos */
export const removeFriend = async (friend_id: number, id: number): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/friends/${friend_id}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${id}`,
      },
    })

    return response

  } catch (error: any) {
    console.error('Falha ao remover amigo', error);
    return error
  }
}

//** Remove amigo da lista de amigos */
export const updateFriend = async (friend_id: number, id: number, data: createFriendProps): Promise<Response> => {
  try {
    const response = await fetch(`${BASE_URL}/friends/${friend_id}/update`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `${id}`,
      },
      body: JSON.stringify(data)
    })

    return response

  } catch (error: any) {
    console.error('Falha ao remover amigo', error);
    return error
  }
}