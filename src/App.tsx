import { ThemeProvider } from 'styled-components'

import { GlobalStyles } from './styles/global.ts'
import { defaultTheme } from './styles/themes/default.ts'
import { BrowserRouter } from 'react-router-dom'

import Router from './Router.tsx'
import CyclesContextProvider from './contexts/CyclesContext.tsx'

export default function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>

        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  )
}
