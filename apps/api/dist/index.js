import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
const PORT = 3000;
const app = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/todos", async (req, res) => {
    const todos = await prisma.todo.findMany();
    res.send({ todos: todos });
});
app.post("/todos", async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        if (body.title === "" || body.description === "") {
            throw new Error('Empty Todo');
        }
        else {
            await prisma.todo.create({
                data: body,
            });
        }
    }
    catch (error) {
        console.error(error);
    }
    res.status(200).send("Success");
});
app.put("/todos", async (req, res) => {
    const body = req.body;
    try {
        await prisma.todo.update({
            where: {
                id: body.id,
            },
            data: {
                completed: body.completed
            },
        });
    }
    catch (error) {
        console.error(error);
    }
    res.send('Success!');
});
app.delete("/todos", async (req, res) => {
    const completed = await prisma.todo.findMany({
        where: {
            completed: true,
        }
    });
    for (const todo of completed) {
        try {
            await prisma.todo.delete({
                where: {
                    id: todo.id,
                }
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    res.send('Success!');
});
app.get("/todos/one", async (req, res) => {
    const id = req.query.id;
    const todo = await prisma.todo.findFirst({
        where: {
            id: id,
        }
    });
    res.send(todo);
});
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
