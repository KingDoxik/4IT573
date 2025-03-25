import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { serveStatic } from 'hono/serve-static'
import Layout from './views/layout'
import { AllTodos } from './views/all-todos'
import { Detail } from './views/detail'


const todos = [
    {
      id: 1,
      title: "Zajit na pivo",
      done: false,
    },
    {
      id: 2,
      title: "Doplnit skripty",
      done: false,
    },
  ]
  
  const app = new Hono()
  
  app.use(logger())

  
  app.get("/", async (c) => {
    return c.html(
      <Layout title="My todo app">
        <AllTodos todos={todos} />
      </Layout>
      ) 
  })
  
  app.post("/todos", async (c) => {
    const form = await c.req.formData()
  
    todos.push({
      id: todos.length + 1,
      title: form.get("title") as string,
      done: false,
    })
  
    return c.redirect("/")
  })

  app.get("/todos/:id", async (c) => {
    const id = Number(c.req.param("id"))

    const todo = todos.find((todo) => todo.id === id)
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
    const todo = todos.find((todo) => todo.id === id)
  
    if (!todo) return c.notFound()
  
    todo.done = !todo.done
  
    return c.redirect(redirect || "/")
  })
  
  app.get("/todos/:id/remove", async (c) => {
    const id = Number(c.req.param("id"))
    const index = todos.findIndex((todo) => todo.id === id)
  
    if (index === -1) return c.notFound()
  
    todos.splice(index, 1)
  
    return c.redirect("/")
  })

  app.post("/todos/:id/update", async (c) => {
    const id = Number(c.req.param("id"))
    const form = await c.req.formData()
    const title = form.get("title") as string
    const todo = todos.find((todo) => todo.id === id)

    if (!todo) return c.notFound()

    todo.title = title

    return c.redirect(`/todos/${id}`)
  })
  
export default { 
    port: 3000, 
    fetch: app.fetch, 
  } 