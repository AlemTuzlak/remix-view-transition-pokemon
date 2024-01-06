import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import "./index.css";

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-hidden h-screen">
        <h1 className="font-bold text-2xl mx-auto sticky top-0 bg-[#FB1B1B] text-white border-b border-b-gray-400 w-full text-center py-2 z-50">
          <Link to={`/`} unstable_viewTransition className="text-white">
            RemixDex Evolutions
          </Link>
        </h1>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
