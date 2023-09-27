'use client'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// ** Custom components
import Loading from "@/app/components/loading/loading";

// ** Services
import { addFriend, getFriendList, removeFriend, updateFriend } from "@/app/services/friend_services";

// ** Hooks
import { useUserStore } from "@/app/store/userStore";

// ** icons
import { Edit, PlusCircle, Trash2 } from "react-feather";
import { ModalComponent } from "@/app/components/modal";
import { NewFriendForm } from "@/app/components/forms/NewFriendForm";

// ** types
interface listProps {
  id: number;
  name: string;
  email: string;
  country: string;
}

interface FriendListProps {
  toggleModal: () => void;
  setTitleModal: (value: string) => void;
  setRow: (data: listProps) => void;
  reload: boolean;
  openAdd: boolean;
  titleModal: string;
  row: { [key: string]: string };
  confirmButtonText: string;
}

export function FriendsList({
  toggleModal,
  setTitleModal,
  setRow,
  reload,
  openAdd,
  titleModal,
  row,
  confirmButtonText
}: FriendListProps) {

  const { user } = useUserStore();
  const [friend_list, setFriendList] = useState([]);
  const [loading, setIsLoading] = useState(true);

  const fetchData = async () => {
    setIsLoading(true);
    setFriendList([])

    const response = await getFriendList(user.id);
    setFriendList(response.friends);
    setIsLoading(false);
  }

  const refetch = () => fetchData();

  const _removeFriend = async (data: listProps) => {
    const response = await removeFriend(data.id, user.id);
    if (response.ok) {
      toast.success('Amigo removido com sucesso!');
      refetch()
      return
    }
    toast.error('Falha ao remover amigo.');
    setIsLoading(false);
  }

  const _updateFriend = async (data: any) => {
    const response = await updateFriend(data.id, user.id, data);
    if (response.ok) {
      toast.success('Dados de amigo alterado com sucesso!');
      refetch()
      return
    }
    toast.error('Falha alterar dados de amigo.');
    setIsLoading(false);
  }

  
  const _addFriend = async (data: any) => {    
    setIsLoading(true);
    
    const payload = {
      name: data.name,
      email: data.email,
      country: data.country
    }
    
    const response = await addFriend(payload, user.id);
    if (response.ok) {
      toast.success('Amigo adicionado com sucesso!')
      refetch()
      return
    }
    toast.error('Falha ao adicionar amigo')
    setIsLoading(false);
  }
  
  const selectConfirmButtonFunction = titleModal === 'Editar' ? _updateFriend : _addFriend

  useEffect(() => {
    fetchData();
  }, [, reload]);

  return (
    <div className='flex flex-col overflow-auto gap-4'>
      <ModalComponent
        open={openAdd}
        title={`${titleModal} amigo`}
      >
        <NewFriendForm
          row={row}
          toggleModal={toggleModal}
          confirmButtonText={confirmButtonText}
          submitForm={selectConfirmButtonFunction}
        />
      </ModalComponent>
      <div className='flex gap-3 items-center justify-between'>
        <h1 className='text-3xl text-purple-600'>Lista de amigos</h1>
        <button
          title='Adicionar Amigo'
          onClick={() => {
            toggleModal()
            setTitleModal('Adicionar')
            setRow(null!)
          }}
          className='flex items-center gap-2 justify-center bg-purple-800 h-10 px-6'
        >
          <PlusCircle size={22} />
          <p>Adicionar</p>
        </button>
      </div>
      <span className='text-sm'>
        Essa é sua lista de amigos, você pode editar informações, remover amigos de sua lista e também adicionar um amigo manualmente.
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
              {friend_list?.map((item: listProps, index: number) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.country}</td>
                  <td className='pe-5'>
                    <div className='flex gap-4 justify-center'>
                      <Edit
                        size={18}
                        className='text-purple-500 cursor-pointer'
                        onClick={() => {
                          toggleModal()
                          setTitleModal('Editar')
                          setRow(item)
                        }}
                      />
                      <Trash2
                        size={18}
                        className='text-red-500 cursor-pointer'
                        onClick={() => _removeFriend(item)}
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