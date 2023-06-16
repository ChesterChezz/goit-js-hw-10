export function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data; // Повертаємо отриманий масив порід
    })
    .catch(error => {
      console.warn('Error fetching cat breeds:', error);
      throw error;
    });
}
const key =
  'live_uEJ2WxDWYjHgx1WTPOKtKan5SD1UbRbLMXShbF9iMF8MA6vobKiHTTmWyigObNv1';
export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${key}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data[0];
    })
    .catch(error => {
      console.warn('Error fetching cat by breed:', error);
      throw error;
    });
}
