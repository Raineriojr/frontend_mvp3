"use client";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as Dialog from '@radix-ui/react-dialog';

const REQUIRED_FIELD = "*Campo obrigatório"

interface NewFriendProps {
  row: { [key: string]: string };
  confirmButtonText: string;
  toggleModal: () => void;
  submitForm: (data: any) => void
}

interface NewFriendFormProps {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
}

export const NewFriendForm = ({
  row,
  confirmButtonText,
  toggleModal,
  submitForm
}: NewFriendProps) => {

  //validation form
  const schema = yup.object({
    firstName: yup.string().required(REQUIRED_FIELD),
    lastName: yup.string().required(REQUIRED_FIELD),
    email: yup.string().email('Informe um email válido').required(REQUIRED_FIELD),
    country: yup.string().required(REQUIRED_FIELD)
  })

  //form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: row?.name?.split(/\s/)[0] || "",
      lastName: row?.name?.split(/\s/)[1] || "",
      email: row?.email || "",
      country: row?.country || "",
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = (values: NewFriendFormProps) => {
    const payload = {
      id: row?.id,
      name: values.firstName + ' ' + values.lastName,
      email: values.email,
      country: values.country
    }
    submitForm(payload)
    toggleModal()
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col gap-1 mt-8'
    >
      <div className='flex flex-col gap-4 md:flex-row md:mb-1'>
        <div className='flex flex-col gap-2 w-full'>
          <label htmlFor='firstName'>Nome</label>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                title='Nome'
                type='text'
                placeholder='Digite o nome'
                onChange={field.onChange}
                data-error={errors.firstName}
                className='border-2 data-[error]:border-red-500'
              />
            )}
          />
          <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
            {errors.firstName?.message}
          </span>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label htmlFor='lastName'>Sobrenome</label>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                title='Nome'
                type='text'
                placeholder='Digite o sobrenome'
                onChange={field.onChange}
                data-error={errors.lastName}
                className='border-2 data-[error]:border-red-500'
              />
            )}
          />
          <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
            {errors.lastName?.message}
          </span>
        </div>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:mb-1'>
        <div className='flex flex-col gap-2 w-full'>
          <label htmlFor='email'>Email</label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                title='Email'
                type='email'
                autoComplete='none'
                placeholder='email@email.com'
                onChange={field.onChange}
                data-error={errors.email}
                className='border-2 data-[error]:border-red-500'
              />
            )}
          />
          <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
            {errors.email?.message}
          </span>
        </div>

        <div className='flex flex-col gap-2 w-full'>
          <label htmlFor='country'>País</label>
          <Controller
            name='country'
            control={control}
            render={({ field }) => (
              <input
                {...field}
                title='País'
                type='country'
                autoComplete='none'
                placeholder='Informe o país'
                onChange={field.onChange}
                data-error={errors.country}
                className='border-2 data-[error]:border-red-500'
              />
            )}
          />
          <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
            {errors.country?.message}
          </span>
        </div>
      </div>

      <div className="mt-[25px] flex justify-end border-t-2 border-t-zinc-700 pt-6">
        <Dialog.Close asChild onClick={toggleModal}>
          <button className="inline-flex items-center justify-center rounded-md w-24 h-9">
            Cancelar
          </button>
        </Dialog.Close>
        <Dialog.Close asChild autoFocus>
          <button type='submit' className="bg-purple-600 inline-flex items-center justify-center rounded-md w-24 h-9">
            {confirmButtonText}
          </button>
        </Dialog.Close>
      </div>
    </form>
  )
}