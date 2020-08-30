import { datalistFetchData } from './datalist-fetch-data.js';

const initForms = () => {
  // All forms on page
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    const formInputs = form.querySelectorAll('input');

    // Submit form handling
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const form = event.target;

      const formInputs = form.querySelectorAll('input');
      formInputs.forEach((input) => {
        localStorage.setItem(
          `form-${form.id}-input-${input.name}-value`,
          input.value,
        );
      });
    });

    // Clear form handling
    const formClearButton = form.querySelector('.form__action-clear');
    formClearButton.addEventListener('click', () => {
      form.reset();
      formInputs.forEach((input) => {
        localStorage.removeItem(`form-${form.id}-input-${input.name}-value`);
      });
    });

    // Read form state from localstorage
    formInputs.forEach((input) => {
      const inputState = localStorage.getItem(
        `form-${form.id}-input-${input.name}-value`,
      );
      if (inputState) {
        input.value = inputState;
      }
    });
  });
};

/**
 * Make some work on 'DOMContentLoaded' event
 */
document.addEventListener('DOMContentLoaded', (event) => {
  initForms();

  /**
   * Connect datalist autocomplete for countries selector
   */
  const countriesDataList = document.querySelector('#countries-datalist');
  const countriesInput = document.querySelector('#countries-input');
  const endpoints = ['./data/countries-part1.json'];
  datalistFetchData(countriesInput, countriesDataList, endpoints, 0);
});
