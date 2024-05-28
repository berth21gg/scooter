'use client'
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function SwitchClient() {
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    // default 
    useEffect(()=>{
        setMounted(true)
        if(!theme){
            setTheme('light')
        }
    }, [theme, setTheme])

    if(!mounted){
        return null
    }

    // cambio de tema
    const switchTheme = ()=>{
        setTheme(theme=='dark'?'light':'dark')
        //console.log('cambio a ' + theme)
    }

    const isTheme =  theme != 'light' ? ' ☀️' : '🌙'

    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                onChange={switchTheme}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                {isTheme}
            </label>
        </div>
    )
}