import React, {useState, useEffect} from 'react'

type Props = {
    children: React.ReactNode
}

type ThemeContextType = {
    theme: any;
    setTheme: (value: any) => void;
};

const ThemeContext = React.createContext<ThemeContextType | undefined> (
    undefined
)

const defaultTheme = {
    theme: "default"
}

export const ThemeProvider = ({children}: Props) => {
    const [theme, setTheme] = useState(defaultTheme)
    const [cssPath, setCssPath] = useState('/style/default.css')

    useEffect(() => {
        const hname = window.location.hostname
        var sub_domain = hname.split(".")
        var stheme = {
            theme: sub_domain[0]
        }
        setCssPath('/style/' + sub_domain[0] + '.css')
        setTheme(stheme)
    }, [])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <link rel="stylesheet" type="text/css" href={cssPath} />
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => React.useContext(ThemeContext)