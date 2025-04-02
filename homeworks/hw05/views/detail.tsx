import type { FC, PropsWithChildren } from "hono/jsx"
import { todoPriorities, type Todo } from "../db/schema"

export const Detail = ({ todo }: PropsWithChildren<{ todo: Todo }>) => {
    return (
        <div>
            <h1>{todo.title} {todo.priority ? `(${todo.priority})` : ""}</h1>
            {todo.done ? (
                        <>
                        <a href={`/todos/${todo.id}/toggle?redirect=/todos/${todo.id}`}>dokončeno</a> &nbsp;
                        <a href={`/todos/${todo.id}/remove`}>odebrat</a>
                        </>
                    ) : (
                        <a href={`/todos/${todo.id}/toggle?redirect=/todos/${todo.id}`}>nedokončeno</a>
                    )}
            <hr />
            <h2>Upravit</h2>
            <form method="post" action={`/todos/${todo.id}/update`}>
                    <label htmlFor="title">Název</label>
                    <input name="title" value={todo.title} /> <br/>
                    <label htmlFor="priority">Priorita</label>
                    <select name="priority">
                        <option value="">Žádná</option>
                        {todoPriorities.map((priority) => (
                            <option value={priority} selected={todo.priority === priority}>{priority}</option>
                        ))}
                    </select> <br/>
                    <button type="submit">Aktualizovat</button>
            </form>
        </div>
    )
}