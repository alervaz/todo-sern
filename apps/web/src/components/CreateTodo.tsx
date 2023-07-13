import { FormEvent, useRef } from "react";
import { z } from "zod";
import { useGlobalContext } from "./Home";
import axios from "axios";


function CreateTodo() {

    const { refetch } = useGlobalContext();
    const titleInput = useRef<HTMLInputElement | null>(null);
    const descriptionInput = useRef<HTMLTextAreaElement | null>(null);

    const deleteTodos = async() => {
        await axios.delete("https://jail-anthony-newton-mod.trycloudflare.com/todos");
        refetch();
    }

    const createTodo = async(e: FormEvent) => {
        const colors = [
            "bg-teal-300",
            "bg-slate-300",
            "bg-purple-300",
            "bg-pink-300",
            "bg-red-200",
            "bg-blue-200",
            "bg-yellow-200",
        ]
    
        const color = colors[Math.floor(Math.random() * colors.length)]

        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const body = {
            title: formData.get("title"),
            description: formData.get("description"),
            completed: false,
            color: color,
        }

        const bodySchema = z.object({
            title: z.string(),
            description: z.string(),
            completed: z.boolean(),
            color: z.string()
        });

        try {
            var validate = bodySchema.parse(body);
        } catch(error) {
            alert(error);
        }
        
        await fetch('https://jail-anthony-newton-mod.trycloudflare.com/todos', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(validate!)
        });
        titleInput.current!.value = "";
        descriptionInput.current!.value = "";
        refetch();
    }

    
    return(
        <form onSubmit={createTodo} className="grid place-items-center items-center h-[100%] mr-auto text-5xl">
            <h1 className="text-white mb-7 font-bold">Crate a new Todo</h1>
            <input 
                type="text" 
                name="title" 
                className="input w-96 m-4 font-bold bg-white text-text" 
                placeholder="Title"
                maxLength={15}
                ref={titleInput}
            />

            <textarea 
                name="description" 
                className="textarea w-96 m-4 font-bold bg-white text-text rounded-lg h-64" 
                placeholder="Description"
                ref={descriptionInput}
            />
            <button type="submit" className="border-none btn my-auto w-64 m-1 bg-white text-text hover:bg-green-500 hover:text-white">Add Todo</button>
        </form>
    )
}

export default CreateTodo;