'use client';
import { Provider } from 'react-redux';
import store from '@/store';
import { AppToolbar } from '@/components/AppToolBar/AppToolbar';
import './global.sass';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body>
          <header>
            <AppToolbar />
          </header>
          <main>
            <div className="Layout-Content">{children}</div>
          </main>
        </body>
      </html>
    </Provider>
  );
}
