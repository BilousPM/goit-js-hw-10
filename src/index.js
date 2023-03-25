import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
// import {fetchCountries} from '../src/fetchCountries'
const DEBOUNCE_DELAY = 1000;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info'),
}

refs.inputEl.addEventListener('input', debounce(hendleSearchInput, DEBOUNCE_DELAY));

function hendleSearchInput(e) {
    let countryName = (e.target.value);
    fetchCountries(countryName)
}



function fetchCountries(country) {
    const URL = `https://restcountries.com/v3.1/name/${country}?fields=name,capital,population,flags,languages`
    return fetch(URL).then(response => {
        if (!response) {
        throw new Error(response.status)
        }
        
    return response.json();
    }).then(country => {

        const markInfo = markUpCountryInfo(country);
        const markList = markUpCountryList(country);

        if (country.length === 1) {
            refs.countryListEl.innerHTML = markInfo
            return
        } else if (country.length > 1 && country.length <= 10) {
            refs.countryListEl.innerHTML = markList
            return
        }
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        // console.log("Too many matches found. Please enter a more specific name.")
    
    // console.log(country.length);
})
};


function markUpCountryList(array) {

    return array.map(({ flags, name, }) => {
        return `<div class="img_wraper"><img
        class="flag_img"
        src="${flags.svg}"
        alt="${name.official}"
        />
        <h3>${name.official}</h3>
        </div>`  
   }).join("")
   
}

function markUpCountryInfo(array) {
    return array.map((count) => {
        return `<img
        class="flag_img"
        src="${count.flags.svg}"
        alt="${count.name.official}"
        />
        <h3>${count.name.official}</h3>
        <p>Capital: ${count.capital}</p>
        <p>Population: ${count.population}</p>
        <p>Languages: ${count.languages}</p>`  
   }).join("")
}