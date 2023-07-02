import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { AppRouter } from '../utils/trpc'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <AppRouter.Provider>
        <Component {...pageProps} />
      </AppRouter.Provider>
    </Provider>
  )
}

export default MyApp