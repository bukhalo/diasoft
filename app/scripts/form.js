const stateKeyTemplateGenerate = (formName, inputName) => {
  return `form-${formName}-input-${inputName}-value`;
};

/**
 * Load form input values from local storage
 * @param form
 */
const formStateLoad = (form) => {
  const formInputs = form.querySelectorAll('input');
  formInputs.forEach((input) => {
    const inputState = localStorage.getItem(
      stateKeyTemplateGenerate(form.id, input.name),
    );
    if (inputState) {
      input.value = inputState;
    }
  });
};

/**
 * Save form input values in local storage
 * @param form
 */
const formStateSave = (form) => {
  const formInputs = form.querySelectorAll('input');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formInputs.forEach((input) => {
      localStorage.setItem(
        stateKeyTemplateGenerate(form.id, input.name),
        input.value,
      );
    });
  });
};

/**
 * Clear form input and related state in local storage
 */
const formStateClear = (form, isStateSaved) => {
  const formInputs = form.querySelectorAll('input');
  const formClearButton = form.querySelector('.form__action-clear');

  formClearButton.addEventListener('click', () => {
    form.reset();

    if (isStateSaved) {
      formInputs.forEach((input) => {
        localStorage.removeItem(stateKeyTemplateGenerate(form.id, input.name));
      });
    }
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  const formStateSaveClass = 'form--state-save';
  const formStateLoadClass = 'form--state-load';

  // All page forms
  const forms = document.querySelectorAll('form');

  const bindActions = (form) => {
    const isStateSaveEnabled = form.classList.contains(formStateSaveClass);
    const isStateLoadEnabled = form.classList.contains(formStateLoadClass);
    const isStateClearEnabled = form.querySelector('.form__action-clear');

    if (isStateSaveEnabled) {
      formStateSave(form);
    }

    if (isStateLoadEnabled) {
      formStateLoad(form);
    }

    if (isStateClearEnabled) {
      formStateClear(form, isStateSaveEnabled);
    }
  };

  forms.forEach((form) => {
    bindActions(form);
  });
});
