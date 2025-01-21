'use client';
import { Provider } from 'react-redux';
import store from '@/store';
import { ConfigProvider } from 'antd';
import { AppToolbar } from '@/components/header/AppToolBar/AppToolbar';

import './global.sass';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          components: {
            Input: {
              activeBorderColor: '#000000',
              hoverBorderColor: '#000000',
              activeShadow: 'rgba(0, 0, 0, 0)',
            },
            Button: {
              defaultHoverBorderColor: '#000000',
              defaultHoverColor: '#000000',
            },
          },
        }}
      >
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
      </ConfigProvider>
    </Provider>
  );
}
