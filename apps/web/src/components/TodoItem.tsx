import { useEffect, useState } from "react";
import { useGlobalContext } from "./Home";

interface Props {
    todo: {
        id: string;
        title: string;
        description: string;
        completed: boolean;
        color: string;
    }
}

function TodoItem({ todo }: Props) {

    const [completed, setCompleted] = useState(todo.completed);


    const update = async() => {
        await fetch(`https://jail-anthony-newton-mod.trycloudflare.com/todos`, {
            method: 'PUT',
            body: JSON.stringify({...todo, completed}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
    }

    



    useEffect(() => {
        update();
    }, [completed]);

    return(
        <div onClick={() => setCompleted(!completed)} className={`todo cursor-pointer
            transition-colors duration-200 p-2 h-56 w-64 rounded-xl mt-5 ${completed ? "bg-red-700" : todo.color}
            text-white min-w-full overflow-y-scroll p-1 scrollable
        `}>
                <h1 className={`${completed && "line-through text-white"} card-title text-3xl`}>{todo.title}</h1>
                <p className={`ml-1 opacity-80 ${completed && "opacity-100 line-through"}`}>{todo.description}</p>
        </div>  
    )
}

export default TodoItem;    