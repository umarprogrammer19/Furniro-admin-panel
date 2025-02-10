"use client"

import { useState, useEffect } from "react"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("UFO_AUTH_TOKEN")
            setIsAuthenticated(!!token)
            setIsLoading(false)
        }

        checkAuth()
    }, [])

    return { isAuthenticated, isLoading }
}

