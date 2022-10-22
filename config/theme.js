import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      "html, body": {
        color: "white",
        background: "black",
      },
      body: {
        fontFamily: "Helvetica Neue",
      },
      h1: {
        fontSize: "7xl",
        fontWeight: "bold",
        lineHeight: "shorter",
      },
      h2: {
        fontSize: "3xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "2xl",
        fontWeight: "normal",
      },
      h4: {
        fontSize: "md",
        fontWeight: "bold",
      },
      p: {
        fontSize: "lg",
      },
    },
  },
})

export default theme
