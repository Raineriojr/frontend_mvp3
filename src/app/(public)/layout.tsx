import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: {
    default: "MVP 3",
    template: "%s | MVP 3"
  },
  description: 'Projeto *** MVP 3 Eng. de Software',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {  
  return (
    <html lang="pt-br">
      <body>
        {children}

        <ToastContainer
          position="top-right"
          autoClose={4000}
        />
      </body>
    </html>
  )
}
