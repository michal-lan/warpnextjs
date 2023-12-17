import { jwtDecode } from 'jwt-decode'

type inMemoryAuthTokenDefaultProps = {
    authToken: string | null | undefined
    authExpiration: number | null | undefined
}

let inMemoryAuthTokenDefault: inMemoryAuthTokenDefaultProps = {
    authToken: null,
    authExpiration: null,
}

let inMemoryAuthToken = inMemoryAuthTokenDefault

// Local Storage Key
export const REFRESH_TOKEN_KEY: string = 'REFRESH_TOKEN'
export const LOGGED_OUT_KEY: string = 'LOGGED_OUT_TIME'

// Helper
export const isBrowser = typeof window !== 'undefined'

export const isTokenExpired = (authToken: string | undefined) => {
    if (authToken) {
        const decode = jwtDecode(authToken).exp

        var current_time = new Date().getTime() / 1000
        if (decode && current_time < decode) {
            return false
        }
    }

    return true
}

export const isLoggedOut = () => {
    const loggedOutTime = getLoggedOutTime()
    return loggedOutTime && loggedOutTime <= Date.now()
}

// Methods

export const deleteRefreshToken = () => {
    if (!isBrowser) return null
    localStorage.removeItem(REFRESH_TOKEN_KEY)
}

export const logout = (callback: any) => {
    inMemoryAuthToken = inMemoryAuthTokenDefault
    deleteRefreshToken()
    setLoggedOutTime()

    if (callback) {
        callback()
    }
}

// Setter

export const setAuthToken = (authToken: null) => {
    if (!isBrowser) return
    if (!authToken) {
        console.log(
            '[setAuthToken]',
            `Auth Token or Auth Expiration shouldn't be ${authToken}.`,
        )
        return
    }
    inMemoryAuthToken = { authToken, authExpiration: jwtDecode(authToken).exp }
}

export const setRefreshToken = (refreshToken: any, callback: any) => {
    if (!isBrowser) return
    if (!refreshToken) {
        // console.log("[setRefreshToken]", `Refresh token shouldn't be ${refreshToken}.`)
        return
    }

    localStorage.setItem(REFRESH_TOKEN_KEY, JSON.stringify(refreshToken))
    localStorage.removeItem(LOGGED_OUT_KEY)

    if (callback) {
        callback()
    }
}

export const setLoggedOutTime = () => {
    if (!isBrowser) return
    localStorage.setItem(LOGGED_OUT_KEY, JSON.stringify(Date.now()))
}

// Getter

export const getInMemoryAuthToken = () => {
    if (!isBrowser) return null
    return inMemoryAuthToken.authToken
}

export const getAuthTokenExpiration = () => {
    if (!isBrowser) return null
    return inMemoryAuthToken.authExpiration
}

export const getRefreshToken = () => {
    if (!isBrowser) return null
    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY)
    return refreshToken !== null ? JSON.parse(refreshToken) : null
}

export const getLoggedOutTime = () => {
    if (!isBrowser) return null
    const loggedOutKey = localStorage.getItem(LOGGED_OUT_KEY)
    return loggedOutKey !== null ? JSON.parse(loggedOutKey) : null
}
