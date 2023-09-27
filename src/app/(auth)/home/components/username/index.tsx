import { useEffect, useState } from 'react';
import { useUserStore } from '@/app/store/userStore';

export const Username = () => {

  const { user } = useUserStore();

  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUsername(user.name)
    setLoading(false)
  }, [user])

  return (
    <p>{loading ? 'Carregando...' : username.split(/\s/)[0]}</p>
  )
}