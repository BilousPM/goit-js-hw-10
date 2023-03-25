import './css/styles.css';
import {fetchCountries} from '../src/fetchCountries'
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputEl: document.querySelector('#search-box'),
    countryListEl: document.querySelector('.country-list'),
    countryInfoEl: document.querySelector('.country-info')
};

refs.inputEl.addEventListener('input', debounce(hendleSearchInput, DEBOUNCE_DELAY));

function hendleSearchInput(e) {
    const countryName = e.target.value.trim();

    if (countryName === '') {
        refs.countryListEl.innerHTML = '';
        return;
    }
    fetchCountries(countryName).then(createsPageMarkup).catch(errorMessage);
};

function createsPageMarkup(country) {
    const markList = markUpCountryList(country);
    const markInfo = markUpCountryInfo(country);

            if (country.length === 1) {
                refs.countryListEl.innerHTML = markList
                refs.countryInfoEl.innerHTML = markInfo
                return;
            } else if (country.length > 1 && country.length <= 10) {
                refs.countryListEl.innerHTML = markList;
                refs.countryInfoEl.innerHTML = '';
                return;
            }
            refs.countryListEl.innerHTML = '';
            Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}
        
function errorMessage(error) {
     Notiflix.Notify.failure("Oops, there is no country with that name")
}

function markUpCountryList(array) {
    return array.map(({ flags, name, }) => {
        return `<div class="img_wraper"><img
        class="flag_img"
        src="${flags.svg}"
        alt="${name.official}" width="50" height="20"
        />
        <h2>${name.official}</h2>
        </div>`
    }).join("");
}

function markUpCountryInfo(array) {
    return array.map(({ capital, population, languages }) => {
        return `
        <p>Capital: ${capital}</p>
        <p>Population: ${population}</p>
        <p>Languages: ${Object.values(languages)}</p>`
    }).join("");
}

