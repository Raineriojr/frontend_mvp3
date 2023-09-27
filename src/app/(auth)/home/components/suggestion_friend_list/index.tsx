'use client'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ** services
import { getFakeUsers } from "@/app/services/fake_users";
import { addFriend } from "@/app/services/friend_services";

// **hooks 
import { useUserStore } from '@/app/store/userStore';

// **custom components
import Loading from '@/app/components/loading/loading';

// ** icons
import { PlusCircle, RefreshCcw } from "react-feather";

// ** types
interface listProps {
  id: number;
  name: {
    first: string;
    last: string;
  }
  email: string;
  location: {
    country: string;
  }
}

export function SuggestionFriendsList({ setReload }: { setReload: (value: any) => void }) {

  const { user } = useUserStore();

  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true)
    setUsers([])
    try {
      const response = await getFakeUsers();
      return setUsers(response.results);
    }
    catch (error) {
      console.error("Falha ao carregar lista de usuários:", error);
      toast.warning('Falha ao carregar lista de usuários');
    }
    finally {
      setIsLoading(false);
    }
  }

  const refetch = () => fetchData();

  const removeItemLocalList = (data: any) => {
    const filteredItems = users.filter((item: any, index) => {
      return item.email !== data.email

    })
    setUsers(filteredItems)
  }

  const _addFriend = async (data: any) => {
    setIsLoading(true)
    const payload = {
      name: data.name.first + ' ' + data.name.last,
      email: data.email,
      country: data.location.country
    }

    try {
      const response = await addFriend(payload, user.id);
      if (response.ok) {
        toast.success('Amigo adicionado com sucesso!')
        setReload((prev: boolean) => !prev)
        removeItemLocalList(data)
        return
      }
    }
    catch (error) {
      console.error("Falha ao adicionar amigo:", error);
      toast.warning('Falha ao adicionar amigo')
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='flex flex-col overflow-auto gap-4'>
      <div className='flex gap-3 items-center'>
        <h1 className='text-3xl text-purple-600'>Sugestão de Amizade</h1>
        <button
          title='Atualizar Lista'
          onClick={refetch}
          className='flex items-center gap-2 justify-center bg-purple-800 h-6 px-2'
        >
          <RefreshCcw size={14} />
        </button>
      </div>
      <span className='text-sm'>
        Adicione usuários à sua lista de amigos. Use o botão de recarregar para buscar novas sugestões.
      </span>

      {loading
        ? (
          <div className="flex h-10 items-center justify-center mt-10">
            <Loading />
          </div>
        )
        : (
          <table className='border border-solid w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>País</th>
                <th className='text-center'>Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item: listProps, index: number) => (
                <tr key={item.email}>
                  <td className='w-16'>{index + 1}</td>
                  <td>{item.name.first + ' ' + item.name.last}</td>
                  <td>{item.email}</td>
                  <td>{item.location.country}</td>
                  <td className='pe-5'>
                    <div className='flex justify-center'>
                      <PlusCircle
                        size={18}
                        className='text-green-600 cursor-pointer'
                        onClick={() => _addFriend(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}