"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// types
import { LoginProps } from './types';

//fetch
import { login } from '@/app/services/login';

//utils
import { setCookie } from '../utils/cookies';
import Loading from '../components/loading/loading';
import { useUserStore } from '../store/userStore';


export default function Login() {

  //hooks
  const route = useRouter();
  const { setUser } = useUserStore();

  //states
  const [loading, setLoading] = useState(false);

  //validation form
  const schema = yup.object({
    email: yup.string().email('Informe um email válido').required('*Campo obrigatório'),
    password: yup.string().required('*Campo obrigatório')
  })

  //form
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: ""
    },
    resolver: yupResolver(schema)
  });

  const onSubmit = async (values: LoginProps) => {
    setLoading(true);
    const response = await login(values);

    if (!response) {
      toast.error('Serviço temporariamente indisponível.')
      setLoading(false);
      return
    }

    if (response.status === 200) {
      const data = await response.json();
      setUser(data)

      setCookie('access_token', data.token)
      return route.push('/home')
    }
    toast.warning('Usuário ou senha incorretos.');
    return setLoading(false);
  }

  if (loading) return <Loading />
  return (
    <div className="flex flex-col gap-2 pt-32 pb-6 mx-6 sm:px-16 md:px-52 xl:px-96 h-screen">
      <h1 className='text-3xl text-purple-600'>Login</h1>
      <p className='text-sm'>MVP 3 Engenharia de Software</p>

      <form
        method='POST'
        noValidate
        className='flex flex-col gap-2 mt-8'
      >
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

        <button
          onClick={handleSubmit(onSubmit)}
          title='Entrar'
          children='Entrar'
          className='bg-purple-900 mt-2 hover:bg-purple-800'
        />
      </form>

      <div className='flex gap-1 items-center justify-end mt-2'>
        <span>Não possui uma conta?</span>
        <Link
          href="/register"
          title='Cadastro'
          children='Cadastre-se'
          className='outline-0 font-medium hover:text-purple-600'
        />
      </div>

      <footer className='flex items-end justify-center h-screen'>
        <small className='tracking-wide'>
          Desenvolvido por Rainério Costa, 2023.
        </small>
      </footer>
    </div>
  )
}