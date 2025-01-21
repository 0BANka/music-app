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
              activeBorderColor: '#000',
              hoverBorderColor: '#000',
              activeShadow: 'rgba(0, 0, 0, 0)',
            },
            Button: {
              defaultHoverBorderColor: '#000',
              defaultHoverColor: '#000',
            },
            Checkbox: {
              colorPrimary: '#333',
              colorPrimaryHover: '#000',
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
