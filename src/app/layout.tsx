import { AuthProvider } from "@/contexts/authContext";
import "./globals.css";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {/* Header */}

          {children}
          {/* Footer */}
        </AuthProvider>
      </body>
    </html>
  );
}
