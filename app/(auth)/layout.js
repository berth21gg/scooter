import "../(general)/globals.css";
import './tailwind.css'


export default function LoginLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="login-layout">
          {children}
        </div>
      </body>
    </html>
  );
}
