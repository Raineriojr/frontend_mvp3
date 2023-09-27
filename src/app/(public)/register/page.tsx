"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

//types
import { RegisterProps } from './types';
import { register } from '@/app/services/register';
import Loading from '@/app/components/loading/loading';


const REQUIRED_FIELD = "*Campo obrigatório"

export default function Register() {

  const route = useRouter();

  //states
  const [loading, setLoading] = useState(false);

  //validation form
  const schema = yup.object({
    name: yup.string().required(REQUIRED_FIELD),
    email: yup.string().email('Informe um email válido').required(REQUIRED_FIELD),
    password: yup.string().required(REQUIRED_FIELD),
    confirmPass: yup.string().required(REQUIRED_FIELD).oneOf([yup.ref('password')], 'Suas senhas não são iguais')
  })

  //form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPass: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (values: RegisterProps) => {
    setLoading(true);
    const response = await register(values);
    const data = await response.json();

    if (response.status === 200) {
      toast.success('Cadastro realizado com sucesso!')
      route.replace('/')
      return
    }
    toast.error('Falha ao realizar cadastro!')
    setLoading(false);
  }

  if (loading) return <Loading />
  return (
    <div className="flex flex-col gap-2 py-20 mb-12 mx-6 sm:px-16 md:px-52 xl:px-96 h-screen">
      <h1 className='text-3xl text-purple-600'>Cadastro</h1>
      <span className='text-sm'>Realize seu cadastro para acessar o sistema.</span>

      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-2 mt-8'
      >
        <label htmlFor='name'>Name</label>
        <Controller
          name='name'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              title='Name'
              type='name'
              placeholder='Digite seu nome'
              onChange={field.onChange}
              data-error={errors.name}
              className='border-2 data-[error]:border-red-500'
            />
          )}
        />
        <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
          {errors.name?.message}
        </span>

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

        <label htmlFor='password'>Senha</label>
        <Controller
          name='password'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              title='Senha'
              type='password'
              placeholder='********'
              onChange={field.onChange}
              data-error={errors.password}
              className='border-2 data-[error]:border-red-500'
            />
          )}
        />
        <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
          {errors.password?.message}
        </span>

        <label htmlFor='confirmPass'>Confirmar Senha</label>
        <Controller
          name='confirmPass'
          control={control}
          render={({ field }) => (
            <input
              {...field}
              title='Senha'
              type='password'
              placeholder='********'
              onChange={field.onChange}
              data-error={errors.confirmPass}
              className='border-2 data-[error]:border-red-500'
            />
          )}
        />
        <span className="font-medium tracking-wide text-red-500 text-xs ml-1 mb-1">
          {errors.confirmPass?.message}
        </span>

        <button
          type='submit'
          title='Confirmar'
          children='Confirmar'
          className='bg-purple-900 mt-2 hover:bg-purple-800'
        />
      </form>

      <div className='flex gap-1 items-center justify-end mt-2'>
        <span>Já tem cadastro?</span>
        <Link
          href="/"
          title='Fazer login'
          children='Faça seu login'
          className='outline-0 font-medium hover:text-purple-600'
        />
      </div>
    </div>
  )
}