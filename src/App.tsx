import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/theme/default'

import { ThemeProvider } from 'styled-components'

import { BrowserRouter} from 'react-router-dom'
import { Router } from './Router'



export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <Router/>
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  )
}
