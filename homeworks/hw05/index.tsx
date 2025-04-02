import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/serve-static'
import Layout from './views/layout'
import { AllTodos } from './views/all-todos'
import { Detail } from './views/detail'
import { todoPriorities, todos, type TodoPriority } from './db/schema'
import { db } from './db'
import { eq } from 'drizzle-orm'

  const app = new Hono()
  
  app.use(logger())

  
  app.get("/", async (c) => {
    const allTodos = await db.query.todos.findMany()
    return c.html(
      <Layout title="My todo app">
        <AllTodos todos={allTodos} />
      </Layout>
      ) 
  })
  
  app.post("/todos", async (c) => {
    const form = await c.req.formData()

    const priority = form.get("priority") as string | null
    const validPriority = priority ? todoPriorities.includes(priority as TodoPriority) : true

    if (!validPriority) {
      return c.text("Invalid priority", 400)
    }

    await db.insert(todos).values({
      title: form.get("title") as string,
      done: false,
      priority: priority as TodoPriority,

    })
  
    return c.redirect("/")
  })

  app.get("/todos/:id", async (c) => {
    const id = Number(c.req.param("id"))

    const todo = await getTodoById(id)
    if (!todo) return c.notFound()
    
    return c.html(
      <Layout title="My todo app">
        <Detail todo={todo} />
      </Layout>
      ) 
  })
  
  app.get("/todos/:id/toggle", async (c) => {
    const id = Number(c.req.param("id"))
    const redirect = c.req.query("redirect")
    const todo = await getTodoById(id)
  
    if (!todo) return c.notFound()
  
    await db.update(todos).set({
      done: !todo.done,
    }).where(eq(todos.id, id))
  
    return c.redirect(redirect || "/")
  })
  
  app.get("/todos/:id/remove", async (c) => {
    const id = Number(c.req.param("id"))
    const todo = await getTodoById(id)
  
    if (!todo) return c.notFound()
  
    await db.delete(todos).where(eq(todos.id, id))
  
    return c.redirect("/")
  })

  app.post("/todos/:id/update", async (c) => {
    const id = Number(c.req.param("id"))
    const form = await c.req.formData()
    const title = form.get("title") as string
    const priority = form.get("priority") as string | null
    const validPriority = priority ? todoPriorities.includes(priority as TodoPriority) : true

    if (!validPriority) {
      return c.text("Invalid priority", 400)
    }

    const todo = await getTodoById(id)

    if (!todo) return c.notFound()

    await db.update(todos).set({
      title: title,
      priority: priority as TodoPriority,
    }).where(eq(todos.id, id))

    return c.redirect(`/todos/${id}`)
  })
  
export default { 
    port: 3000, 
    fetch: app.fetch, 
  } 


  const getTodoById = async (id: number) => {
    return await db.query.todos.findFirst({
      where: eq(todos.id, id),
    })
  }