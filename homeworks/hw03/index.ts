

const counterFile = Bun.file("counter.txt");

Bun.serve({
    port: 3000,
    routes: {
        "/increase": async () => {
            let counter = await getCounter();
            await setCounter(counter + 1);
            return new Response((counter + 1).toString());
        },

        "/decrease": async () => {
            let counter = await getCounter();
            await setCounter(counter - 1);
            return new Response((counter - 1).toString());
        },

        "/read": async () => {
            const counter = await getCounter();
            return new Response(counter.toString());
        },
    },
    fetch() {
        return new Response("Not Found", { status: 404 });
      },
});

async function getCounter() {
    const counterFile = Bun.file("counter.txt");
    if (!(await counterFile.exists())) {
        return 0;
    }
    const counter = parseInt(await counterFile.text());
    if (isNaN(counter)) {
        return 0;
    }
    return counter;
}

async function setCounter(counter: number) {
    await Bun.write(counterFile, counter.toString());
}
