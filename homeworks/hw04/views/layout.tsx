import type { FC, PropsWithChildren,  } from "hono/jsx";

type LayoutProps = {
    title: string;
}

export const Layout = ({ title, children }: PropsWithChildren<{
    title: string;
}>) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>Document</title>
      </head>
      <body>
        <a href="/">
            <h1>{title.toUpperCase()}</h1>
        </a>

        {children}
      </body>
    </html>
  );
};

export default Layout;
