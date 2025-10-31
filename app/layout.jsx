// app/layout.jsx
// Fixing syntax errors and removing problematic TypeScript imports

import "./globals.css";

// Metadata को सीधा export करें (TypeScript Syntax हटा दिया गया है)
export const metadata = {
  title: "School Management Portal",
  description: "Full-stack CRUD application built with Next.js and MySQL",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      {/* Tailwind CSS के साथ सादा body, Geist fonts हटाए गए */}
      <body className="antialiased"> 
        {children}
      </body>
    </html>
  );
}
