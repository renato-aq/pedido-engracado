import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Convite Especial",
  description: "Um pedido engraçado para assistir Senhor dos Aneis."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
