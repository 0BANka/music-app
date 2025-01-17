'use client';
import { Provider } from 'react-redux';
import store from '@/store';
import './global.sass';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <Provider store={store}>
            <div className="Layout-Content">{children}</div>
          </Provider>
        </main>
      </body>
    </html>
  );
}
