import { ChakraProvider } from "@chakra-ui/react"

import theme from "../config/theme"
import Fonts from "../config/fonts"

function AssignmentApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default AssignmentApp
