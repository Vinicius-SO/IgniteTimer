import { GlobalStyles } from './styles/global'
import { defaultTheme } from './styles/theme/default'

import { ThemeProvider } from 'styled-components'

import { Button } from './components/Button'

export function App() {
    return (
      <ThemeProvider theme={defaultTheme}>
          <Button variant='danger' />
          <Button variant='secondary' />
          <Button />
          <Button />

          <GlobalStyles/>
      </ThemeProvider>  
    )
}

