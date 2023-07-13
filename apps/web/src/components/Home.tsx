import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import Todos from './Todos'
import { useInfiniteQuery, useQuery } from 'react-query';
import axios from 'axios';
import Navbar from './Navbar';
import { AiOutlineMenu } from 'react-icons/ai';

export interface Todo {
  title: string;
  description: string;
  completed: boolean;
  id: string;
  color: string;
}

interface Context {
  todos: Todo[];
  refetch: () => void;
  isLoading: boolean;
  show: boolean;
  showNavbar: boolean;
  setShowNavbar: Dispatch<SetStateAction<boolean>>,
}

const GlobalContext = createContext<Context>({
  todos: [],
  refetch: () => {return},
  isLoading: false,
  show: false,
  showNavbar: false,
  setShowNavbar: () => {return},
});

export const useGlobalContext = () => {
  return useContext(GlobalContext);
}


function Home() {
  const [show, setShow] = useState(window.matchMedia("(max-width: 700px)").matches);
  const [showNavbar, setShowNavbar] = useState(false);
  const { data, isLoading, refetch } = useQuery({
    queryFn: async() => {
      const data = await axios.get('https://jail-anthony-newton-mod.trycloudflare.com/todos');
      return data.data.todos as Todo[];
    },
    queryKey: ["todos"],
  })

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 2000);
  
    return () => clearInterval(interval)
  }, [])




  window
    .matchMedia("(max-width: 40em)")
    .addEventListener('change', e => setShow( e.matches ));

  return(
    <GlobalContext.Provider value={{ showNavbar, show, todos: data!, refetch, isLoading, setShowNavbar }}>
      <main className='flex h-[90vh] w-[80vw] bg-[#f2f2f2] rounded-xl shadow-2xl mx-auto'>
        <Navbar/>
        <section className='w-full'>
          <header  className='flex justify-start'>
            {show && !showNavbar && <button onClick={() => setShowNavbar(true)} className='relative translate-x-6 mb-14'>{<AiOutlineMenu size={20}/>}</button>}
            <h1 className={`text-5xl mx-auto ${show && "ml-4"} mb-5 m-3 font-bold text-text text-center`}>
              The <span className='text-emerald-300'>TODO-APP</span> of your <span className='text-emerald-300'>DREAMS</span></h1>
          </header>
          <Todos/>
        </section>
      </main>
    </GlobalContext.Provider>
  )
}

export default Home
