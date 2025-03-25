import type { FC, PropsWithChildren } from "hono/jsx"
import type { Todo } from "../types"

export const Detail = ({ todo }: PropsWithChildren<{ todo: Todo }>) => {
    return (
        <div>
            <h1>{todo.title}</h1>
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
                    <input name="title" value={todo.title} />
                    <button type="submit">Aktualizovat</button>
            </form>
        </div>
    )
}