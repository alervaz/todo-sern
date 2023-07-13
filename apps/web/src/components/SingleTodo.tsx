import { useParams } from "react-router-dom"
import { Todo } from "./Home";
import { useQuery } from "react-query";
import axios from "axios";
import { BiArrowBack } from 'react-icons/bi';

function SingleTodo() {
    const { id } = useParams();
    const { data, isLoading } = useQuery({
        queryKey: ["single-todo"],
        queryFn: async() => {
            const res = await axios.get(`https://jail-anthony-newton-mod.trycloudflare.com/todos/one?id=${id}`);
            return res.data as Todo;
        }
    })

    if(isLoading) {
        return <p>Loading...</p>
    } else {
        // const todo = todos.filter(val => val.id === id)[0];
        // console.log(todo);
        console.log(data);
        

        return (
            <div className={`w-[70vw] h-[80vh] p-1 min-w-[90vw] min-h-[90vh] rounded-xl shadow-xl text-white ${data?.color}`}>
                <section className="w-full h-full overflow-y-scroll scrollable">
                    <a href="/"><BiArrowBack size={30}/></a>
                    <h1 className=" text-7xl font-bold">{data?.title}</h1>
                    <p className="text-5xl opacity-80 font-semibold">{data?.description}</p>
                </section>
            </div>
        )
    }

    
}

export default SingleTodo