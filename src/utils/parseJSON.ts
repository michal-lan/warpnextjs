export const parseJSON = (value: string) => {
    let result = {}

    if (value) {
        try {
            result = JSON.parse(value)
        } catch (error) {
            console.error(error)
            throw new Error('Failed to parse json')
        }
    }

    return result
}
