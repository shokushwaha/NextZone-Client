import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react'
import { Toaster, toast } from 'react-hot-toast';
export default function Login() {

  const { setLoggedInUser } = useContext(CartContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { setLoggedIn } = useContext(CartContext);
  const handleLogin = async (e) => {

    try {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Fill all the fields")
        return;
      }

      const res = await axios.post('/api/login', { email, password });

      if (res) {
        toast.success("Logged In")
        setLoggedIn(true);
        localStorage.setItem('loggedIn', JSON.stringify('true'));
        localStorage.setItem('loggedInUser', JSON.stringify(res))
        setLoggedInUser(res);
        router.push('/');

      }
      else {
        toast.error("Invalid credentials")
      }
    } catch (error) {

      console.log(error.message);
    }

  }
  return (
    <>
      <Center>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <div className="flex items-center justify-center gap-20  py-56">
          <div className='flex flex-col text-8xl items-center gap-4'>
            NEXTZONE
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

          </div>
          <div className='flex flex-col gap-8'>

            <form onSubmit={handleLogin} className='flex flex-col px-8'>
              <h1 className='text-4xl pb-4 uppercase'>Login</h1>
              <div className='flex flex-col gap-1 mb-2'>

                <label className='flex gap-1 items-center justify-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                </svg>
                  Email</label>
                <input type="text" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}
                  className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow'
                />
              </div>

              <div className='flex flex-col gap-1 mb-2'>

                <label className='flex gap-1 items-center justify-start'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                </svg>
                  Password</label>
                <input type="password" placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} className='px-4 py-1 rounded-md border-b-2 border-blue-200 shadow' />
              </div>
              <button type='submit' className='bg-blue-200 px-4 py-1 rounded-md hover:bg-blue-400 mt-2'>Login</button>
            </form>
            <div className='flex flex-col px-8'>
              New to NextZone?
              <Link href={'/register'} className='text-blue-600 '>
                Regiter here!
              </Link>
            </div>
          </div>
        </div>
      </Center>


    </>
  )
}
