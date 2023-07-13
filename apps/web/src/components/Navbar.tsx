import axios from "axios";
import { useGlobalContext } from "./Home";
import './Navbar.css';
import { GiExitDoor } from 'react-icons/gi';


function Navbar() {

    const { refetch, showNavbar, setShowNavbar, show, todos, isLoading } = useGlobalContext();


    const deleteTodos = async() => {
        await axios.delete("https://jail-anthony-newton-mod.trycloudflare.com/todos");
        refetch();
    }

    return(
        <nav className={`nav h-full flex flex-col items-center ${showNavbar && "show"} z-10`}>
            <header className="flex w-full">
                <button className={`mr-auto ${!show && "hidden"}`} onClick={() => setShowNavbar(false)}><GiExitDoor size={30}/></button>
                <h1 className={`card-title mr-auto  text-4xl mt-2 ${!show && "ml-auto"}`}>Navbar</h1>
            </header>

            <main className="my-auto h-[70%] w-full overflow-y-scroll flex flex-col items-center scrollable">
                {isLoading 
                    ? <p>Loading...</p>
                    : <>
                        {todos.map(todo => 
                            <a key={todo.id} href={`/${todo.id}`} className={`${todo.color} cursor-pointer w-[90%] h-16 p-2 my-2 text-white rounded-lg shadow-lg text-lg overflow-y-hidden`}>
                                <h1 className="font-bold">{todo.title}</h1>
                                <p className="font-semibold opacity-50">{todo.description}</p>
                            </a>
                        )}
                    </>
                }
            </main>

            <button type="button" className={`border-none bg-emerald-300 text-white mt-auto mb-2
              btn w-[90%] m-1 hover:bg-red-500 ${show ? "h-32" : "h-16"}`} 
              onClick={() => deleteTodos()}>
                Delete Completed
            </button>
            
        </nav>
    )
}

export default Navbar;