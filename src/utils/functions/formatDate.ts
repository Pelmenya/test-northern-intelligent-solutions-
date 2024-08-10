export const formatDate = (str: string ):string => {
    return str.slice(0,10).split('-').reverse().join('.')
}