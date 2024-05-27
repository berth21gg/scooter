import "../(general)/globals.css";
import { AuthProvider } from "../Providers";
import './tailwind.css'


export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
