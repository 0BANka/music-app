'use client';
import { Provider } from 'react-redux';
import store from '@/store';
import { Toolbar } from '@/components/Toolbar/Toolbar';
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
            <div className="Layout-Content">
              <Toolbar />
              {children}
            </div>
          </Provider>
        </main>
      </body>
    </html>
  );
}
