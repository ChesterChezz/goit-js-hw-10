import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const catBreed = document.querySelector('.cat-breed');
const catDescription = document.querySelector('.cat-description');
const catTemperament = document.querySelector('.cat-temperament');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

error.style.display = 'none';
loader.style.display = 'none';
fetchBreeds()
  .then(breeds => {
    //отриманий масив порід
    // console.log(breeds);
    // fill select
    for (let i = 0; i < breeds.length; i++) {
      const option = document.createElement('option');
      option.value = breeds[i].id;
      option.textContent = breeds[i].name;

      // Додавання елементу <option> до елементу <select>
      select.appendChild(option);
    }
    new SlimSelect({
      select: '#selectElement',
    });
  })
  .catch(error => {
    // Обробка помилок, якщо виникли проблеми з виконанням запиту
    console.error(error);
  });

select.addEventListener('change', () => {
  const breedId = select.value;
  catInfo.style.display = 'none';
  error.style.display = 'none';
  loader.style.display = 'block';
  fetchCatByBreed(breedId)
    .then(catData => {
      catImage.src = catData.url;
      catBreed.textContent = catData.breeds[0].name;
      catDescription.textContent = catData.breeds[0].description;
      catTemperament.innerHTML = `<strong>Temperament:</strong> ${catData.breeds[0].temperament}`;

      catInfo.style.display = 'flex';
      loader.style.display = 'none';
    })
    .catch(error => {
      console.warn('Error fetching cat:', error);
      error.style.display = 'block';
      loader.style.display = 'none';
    });
});
