import "./globals.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import PincodeBar from "./components/PincodeBar";
import CategoryNav from "./components/CategoryNav";
import BannerSlider from "./components/BannerSlider";

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
        <CategoryNav />
        <BannerSlider />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

