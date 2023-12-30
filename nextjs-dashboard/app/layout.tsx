import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import ThemeRegistry from './ui/ThemeRegistry';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
