import type { FC } from "hono/jsx"
import type { Todo } from "../db/schema"

export const AllTodos = ({ todos }: { todos: Todo[] }) => {
    return (
        <div>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                    <a href={`/todos/${todo.id}`}>{todo.title} {todo.priority ? `(${todo.priority})` : ""}</a> -{' '}
                    {todo.done ? (
                        <>
                        <a href={`/todos/${todo.id}/toggle`}>dokončeno</a>&nbsp;
                        <a href={`/todos/${todo.id}/remove`}>odebrat</a>
                        </>
                    ) : (
                        <a href={`/todos/${todo.id}/toggle`}>nedokončeno</a>
                    )}
                    </li>
                ))}
            </ul>

            <form method="post" action="/todos">
                <input name="title" />
                <button type="submit">Přidat todo</button>
            </form>
        </div>
    )
}