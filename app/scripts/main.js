import { datalistFetchData } from './datalist-fetch-data.js';

// Emulate server request
const formDataSend = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, { status: 200, message: 'ok' });
  // setTimeout(reject, 1000, { status: 400, message: 'error' } )
});

const initSignUpForm = () => {
  const form = document.querySelector('#signup');
  const formInfo = form.querySelector('.form__info');

  // Submit form handling
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
      const req = await formDataSend;
      if (req.status === 200) {
        formInfo.innerHTML = 'Form data sent successfully 👍';
        console.info('Form data sent successfully 👍');
        return;
      }
      throw req;
    } catch (e) {
      formInfo.innerHTML = 'Error while send form data 😭';
      console.error('Error while send form data 😭');
      console.error(e);
    }
  });
};

/**
 * Make some work on 'DOMContentLoaded' event
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initSignUpForm();

  /**
   * Connect datalist autocomplete for countries selector
   */
  const countriesDataList = document.querySelector('#countries-datalist');
  const countriesInput = document.querySelector('#countries-input');
  const endpoints = ['./data/countries-part1.json'];
  datalistFetchData(countriesInput, countriesDataList, endpoints, 0);
});
