import "../(general)/globals.css";


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
