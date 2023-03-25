// export function fetchCountries(country) {
//     let URL = "https://restcountries.com/v3.1/name/usa"
// return fetch(URL).then(response => {
//     return response.json();
// })
// };

export function fetchCountries(country) {
    const URL = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
    return fetch(URL).then(response => {
        if (!response.ok) {
            throw new Error(response.status)
        }
        
        return response.json();
    })
};