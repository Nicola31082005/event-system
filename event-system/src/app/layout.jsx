import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Event System",
  description: "Event System",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full">
        <body className="flex min-h-screen flex-col">
          <Header />
        <main className="flex-grow">
          {children}
        </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
