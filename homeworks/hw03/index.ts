

const counterFile = Bun.file("counter.txt");

Bun.serve({
    port: 3000,
    routes: {
        "/increase": async () => {
            let counter = 0;
            
            // Load counter from file
            if (await counterFile.exists()) {
                const fileContent = await counterFile.text();
                counter = parseInt(fileContent);
                if (isNaN(counter)) {
                    counter = 0;
                }
            }
            
            await Bun.write(counterFile, `${counter + 1}`);
            return new Response((counter + 1).toString());
        },

        "/decrease": async () => {
            let counter = 0;
            
            // Load counter from file
            if (await counterFile.exists()) {
                const fileContent = await counterFile.text();
                counter = parseInt(fileContent);
                if (isNaN(counter)) {
                    counter = 0;
                }
            }

            await Bun.write(counterFile, `${counter - 1}`);
            return new Response((counter - 1).toString());
        },

        "/read": async () => {
            
            if (!(await counterFile.exists())) {
                return new Response("0");
            }

            const fileContent = await counterFile.text();
            const counter = parseInt(fileContent);
            if (isNaN(counter)) {
                return new Response("0");
            }
            return new Response(counter.toString());
        },
    },
    fetch() {
        return new Response("Not Found", { status: 404 });
      },
});