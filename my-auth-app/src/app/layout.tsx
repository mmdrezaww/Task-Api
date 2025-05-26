import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
        <body className="bg-gray-50 font-sans">{children}</body>
        </html>

    );
}

