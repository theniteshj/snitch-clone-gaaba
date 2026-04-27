import "./globals.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import PincodeBar from "./components/PincodeBar";

export const metadata = {
  title: "THE GAABA",
  description: "Rajasthan's First Gen Z Streetwear Brand",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <PincodeBar />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

