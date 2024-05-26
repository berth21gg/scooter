'use client'
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export default function SwitchClient() {
    const { theme, setTheme } = useTheme()

    // default 
    useEffect(()=>{
        setTheme('light')
    }, [])

    // cambio de tema
    const switchTheme = ()=>{
        setTheme(theme=='dark'?'light':'dark')
        //console.log('cambio a ' + theme)
    }

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
                Tema oscuro
            </label>
        </div>
    )
}