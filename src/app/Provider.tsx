'use client'

import { Toaster } from 'sonner'
import store from '@/redux/store';
import { NextUIProvider } from '@nextui-org/react'
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <NextUIProvider>
                {children}
                <Toaster
                    position="bottom-center"
                    theme='dark'
                />
            </NextUIProvider>
        </Provider>
    )
}