/**
 * Generate datalist
 *
 * @param input Input element
 * @param datalist Datalist element
 * @param endpoints Endpoints for fetch datalist data
 * @param minCharacters Minimum number of characters before we start to generate suggestions
 */
export const datalistFetchData = (
  input,
  datalist,
  endpoints,
  minCharacters,
) => {
  const client = new XMLHttpRequest();
  input.addEventListener('input', (event) => {
    const input = event.target;
    if (input.value.length < minCharacters) return;

    // abort any pending requests
    client.abort();

    client.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const response = JSON.parse(this.responseText);
        datalist.innerHTML = '';
        response.forEach((item) => {
          const option = document.createElement('option');
          option.value = item;
          datalist.appendChild(option);
        });
      }
    };

    client.open('GET', endpoints[0], true);
    client.send();
  });
};
