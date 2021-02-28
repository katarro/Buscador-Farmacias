export const getPharmacys = async (url) =>{
    try {        
        const promise = await fetch(url)
        const data = await promise.json()
        return data
    } catch (error) {}
}