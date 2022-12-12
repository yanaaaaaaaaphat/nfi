import { extendTheme } from "@chakra-ui/react";

const fonts = {
    heading: `'Comfortaa', cursive`,
    body: `'Comfortaa', cursive`,
  };
  const components = {

    Heading: {
      variants: {
        headline1: {
          fontSize: "66px",
          lineHeight: `${1.25 * 66}px`,
          fontWeight: 500,
          color: "white"
        },
        headline2: {
          fontSize: "36px",
          lineHeight: `${1.25 * 36}px`,
          fontWeight: 500,
          color: "white"
        },
        headline3: {
          fontSize: "24px",
          lineHeight: `${1.25 * 24}px`,
          fontWeight: 500,
          color: "white"
        },
      },
    

    },
  };

const theme = extendTheme({ fonts, components });

export default theme;