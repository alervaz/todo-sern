import { useGlobalContext } from './Home';
import { useRef } from 'react';
import TodoItem from './TodoItem';
import './Todos.css'
import { AiOutlinePlus } from 'react-icons/ai';
import { GiExitDoor } from 'react-icons/gi';
import CreateTodo from './CreateTodo';

interface Todo {
    title: string;
    description: string;
    id: string;
    color: string;
    completed: boolean;
}


function Todos() {
    const modal = useRef<HTMLDialogElement | null>(null)
    const { isLoading,todos } = useGlobalContext();


    if(isLoading) {
        return <p>Lodaing...</p>
    }

    return (
        <main className='main h-[90%] p-4 grid justify-center responsive-grid overflow-y-scroll'>
            {todos?.map(todo => 
                <TodoItem key={todo.id} todo={todo}/>
            )}
            <div onClick={() => modal.current?.showModal()} className={`todo cursor-pointer
                transition-colors duration-200 p-2 h-56 min-w-full w-64 rounded-xl mt-5 bg-slate-400
                text-white grid place-items-center
            `}>
                <AiOutlinePlus size={30}/>
            </div>
            <dialog ref={modal} className='rounded-xl shadow-lg modal w-[60vw] h-[50vh] bg-emerald-300 mx-auto my-auto backdrop:bg-black overflow-y-scroll scrollable backdrop:opacity-70'>
                <section className='flex w-full h-full justify-start'>
                    <button onClick={() => modal.current?.close()} className='h-fit outline-none mt-4 mr-auto translate-x-3 '>{<GiExitDoor size={40}/>}</button>
                    <CreateTodo/>
                </section>
            </dialog>
        </main>
    )
}

export default Todos;