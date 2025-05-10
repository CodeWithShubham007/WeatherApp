import { useTheme } from "@/Context/theme-provider"
import { Link } from "react-router-dom"
import { Sun, Moon } from "lucide-react"
import { useState } from "react";
import CitySearch from "./City_Search";

const Header = () => {

    const {theme, setTheme} = useTheme();
    // console.log(theme);
    
    const isDark = theme === 'dark'
    const [visible, setVisible] = useState<boolean>(false)

    const handleClick = () => {
        setTheme(isDark ? "light" : "dark")
        setVisible(!visible)
    }
  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <Link to='/' >
                <img src={isDark ? "./1.png" : "2.jpg"} alt="not found" className="h-14" />
            </Link>
            <div className="flex gap-4">
                {/* Search */}
                <CitySearch />
                {/* Theam Toggle */}
                
                <div onClick={handleClick} className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-360" : "rotate-0"} `}>
                    {visible ?  <Sun className="h-7 w-7 text-yellow-500 rotate-0 transition-all " /> : <Moon className="h-7 w-7 text-blue-500 rotate-0 transition-all" />}</div>
            </div>
        </div>
    </header>
  )
}

export default Header
