'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// icons
import { Bell, User, LogOut } from 'react-feather';

import { Username } from '@/app/(auth)/home/components/username';

//utils
import { removeCookie } from '@/app/utils/cookies';

//services
import { SuggestionFriendsList } from './components/suggestion_friend_list';
import { FriendsList } from './components/friend_list';

import Loading from '@/app/components/loading/loading';


export default function Home() {
  //hooks
  const route = useRouter();

  //states
  
  const [reload, setReload] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [row, setRow] = useState({});
  const [titleModal, setTitleModal] = useState('Cadastrar');

  const toggleModal = () => setOpenAdd(prev => !prev);

  const logout = () => {
    removeCookie('access_token')
    return route.replace('/')
  }

  /* useEffect(() => {
    setLoading(false)
  }, []) */


  return (
    <div className='mb-8'>
      <div title='Header' className='bg-gray-900 flex items-center rounded-b-lg gap-8 pt-4 pb-2 px-4 md:px-6'>
        <div className='w-28 border-e-2 pt-3'>
          <span>MVP 3</span>
        </div>

        <div className='flex items-center justify-between w-full gap-10'>
          <div className='flex flex-wrap'>
            <span>Bem Vindo,
              <span className='text-lg font-medium'>
                <Username />
              </span>
            </span>
          </div>
          <div className='flex gap-6'>
            <button title='Perfil'>
              <User size={20} />
            </button>
            <button title='Notificações'>
              <Bell size={20} />
            </button>
            <button title='Sair' onClick={logout}>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </div>


      <section className="flex flex-col pt-12 px-6 lg:px-24 gap-4">
        <FriendsList
          toggleModal={toggleModal}
          setTitleModal={setTitleModal}
          reload={reload}
          row={row}
          setRow={setRow}
          confirmButtonText='Confirmar'
          openAdd={openAdd}
          titleModal={titleModal}
        />
      </section>

      <section className="flex flex-col pt-12 px-6 lg:px-24 gap-4">
        <SuggestionFriendsList setReload={setReload} />
      </section>
    </div >
  )
}