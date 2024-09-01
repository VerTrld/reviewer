import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "../styles/globals.css";
import "@mantine/tiptap/styles.css";
import "@mantine/core/styles.css";

import { ColorSchemeScript, MantineProvider } from "@mantine/core";

import { ModalsProvider } from "@mantine/modals";
import QueryClientProvider from "@/provider/QueryClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ReviewMaster",
  description: "Reviewer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <QueryClientProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </QueryClientProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
