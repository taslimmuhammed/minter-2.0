import { ThemeConfig, extendTheme } from "@chakra-ui/react";

const theme:ThemeConfig = extendTheme({
    config: {
        initialColorMode: "dark",
        useSystemColorMode: false,
    },
})
export default theme;
