import Header from "@/components/header/header";
import "./globals.css";
import MainHeaderBackground from "@/components/main-header-background/main-header-background";

export const metadata = {
  title: 'NextLevel Food',
  description: 'Delicious meals, shared by a food-loving community.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainHeaderBackground/>
        <Header/>
        
        {children}
      </body>
    </html>
  );
}
