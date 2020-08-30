const inputMaskPhoneNumber = () => {
  const inputs = document.querySelectorAll('.input--mask-phone-number');

  if (inputs.length > 0) {
    inputs.forEach((input) => {
      input.addEventListener('input', (e) => {
        const x = e.target.value
          .replace(/\D/g, '')
          .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        e.target.value = !x[2]
          ? x[1]
          : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
      });
    });
  }
};

document.addEventListener('DOMContentLoaded', (event) => {
  inputMaskPhoneNumber();
});
