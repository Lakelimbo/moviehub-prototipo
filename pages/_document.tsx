import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
   return (
      <Html>
         <Head>
            <meta charSet="UTF-8" />
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1.0"
            />
            <meta name="description" content="Protótipo de loja de filmes" />
            <meta
               name="keywords"
               content="HTML, CSS, JavaScript, TypeScript, React, Next"
            />
            <meta name="author" content="Gabriel Lake" />
         </Head>
         <body className="overflow-x-hidden">
            <Main />
            <NextScript />
         </body>
      </Html>
   );
}
