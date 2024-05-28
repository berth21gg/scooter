// layout.js
import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.css";
import ThemeProviderClient from "./provider/ThemeProviderClient";
import "./globals.css";
import Link from "next/link";
import LinkClient from "./components/LinkClient";
import SwitchClient from "./components/SwitchClient";
import SignOut from "./components/SignOut";
import CartIcon from "./components/CartIcon"; // Importar CartIcon

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ElecScoot",
  description: "Tienda en línea de scooters con NextJs",
};

export default function RootLayout({ children }) {
  const isLoginPage =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("./login");

  if (isLoginPage) {
    return <ThemeProviderClient>{children}</ThemeProviderClient>;
  }

  return (
    <html lang="en">
      <body>
        <ThemeProviderClient>
          <nav className="navbar fixed-top navbar-expand-lg" data-bs-theme="">
            <div className="container-fluid">
              <Link className="navbar-brand d-flex align-items-center" href="/">
                <img
                  src="./img/logo.png"
                  alt="Logo"
                  height={35}
                  className="d-inline-block align-text-top"
                />
                <span className="fs-2 ps-3 fw-bold">ElecScoot</span>
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <LinkClient route="/" texto="Home" />
                  </li>
                  <li className="nav-item">
                    <LinkClient route="/scooter" texto="Scooters" />
                  </li>
                  <li className="nav-item">
                    <LinkClient route="/importacion" texto="Importacion" />
                  </li>
                  <li className="nav-item">
                    <LinkClient route="/reportes" texto="Reportes" />
                  </li>
                </ul>
              </div>

              <SignOut />

              <Link href="/carro" className="cartLink">
                <CartIcon /> {/* Usar CartIcon */}
              </Link>

              <SwitchClient />
            </div>
          </nav>
          {children}
        </ThemeProviderClient>
      </body>
    </html>
  );
}
