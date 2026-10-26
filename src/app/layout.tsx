import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Connect 4",
  icons: {
    icon: "/icons/favicon.ico"
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
