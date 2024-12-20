import type {Metadata} from "next";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {NextUIProvider} from '@nextui-org/react';
import React from "react";
import ClientSessionProvider from "@/app/components/ClientSessionProvider/Index";

const title = "Solana Spin & Win: Crypto Betting Wheel for Big Rewards";
const description = "Experience the thrill of spinning and winning with our crypto betting app! Spin the wheel," +
    " place your bets, and enjoy a chance to win crypto rewards. Safe, secure, and full of excitement—join now " +
    "and see where the wheel takes you!\"";

export const metadata: Metadata = {
    title: title,
    description: description,
    openGraph: {
        title: title,
        description: description,
        url: "https://game.solanaspin.io/",
        images: [
            {
                url: "https://solanaspin.io/wp-content/uploads/2024/11/twitter-card.png",
                width: 1200,
                height: 630,
                alt: "Description of the image",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: ["https://solanaspin.io/wp-content/uploads/2024/11/twitter-card.png"],
    },
};

// import {headers} from "next/headers";
export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    // const cookie = headers().get("cookie");
    return (
        <html lang="en">
        <body className="antialiased">
        <NextUIProvider>
            <div className="min-h-screen ">
                <ClientSessionProvider>
                    <main>{children}</main>
                </ClientSessionProvider>
            </div>
        </NextUIProvider>
        {/*todo uncomment this section when the app si ready to go*/}
        {/*<script*/}
        {/*    type="text/javascript"*/}
        {/*    async*/}
        {/*    dangerouslySetInnerHTML={{*/}
        {/*        __html: `*/}
        {/*                    (function(c,l,a,r,i,t,y){*/}
        {/*                        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};*/}
        {/*                        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;*/}
        {/*                        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);*/}
        {/*                    })(window, document, "clarity", "script", "odqlb9qomc");*/}
        {/*                `,*/}
        {/*    }}*/}
        {/*></script>*/}
        </body>
        </html>
    );
}
