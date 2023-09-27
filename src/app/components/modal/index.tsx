'use client'
import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalProps {
  children: React.ReactElement;
  open: boolean;
  title: string;
}

export const ModalComponent = (
  {
    children,
    open,
    title
  }: ModalProps) => (
  <Dialog.Root open={open} >
    <Dialog.Portal>
      <Dialog.Overlay className="bg-zinc-900 opacity-40 fixed inset-0" />
      <Dialog.Content className="bg-zinc-800 fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px]">
        <Dialog.Title className="text-purple-500 m-0 text-[17px] font-medium">
          {title}
        </Dialog.Title>

        {children}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);