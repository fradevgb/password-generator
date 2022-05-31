(() => {
  const rangeCharacters = document.querySelector('.range-char');
  const numberCharacters = document.querySelector('.number-char');
  const formContainer = document.querySelector('.password-form');
  const numbersEl = document.querySelector('.numbers');
  const symbolsEl = document.querySelector('.symbols');
  const uppercaseEl = document.querySelector('.uppercase');
  const passwordDisplay = document.querySelector('.password-display');

  const lowercaseCharCodes = arrayLowToHight(97, 122);
  const numberCharCodes = arrayLowToHight(48, 57);
  const symbolCharCodes = arrayLowToHight(33, 47)
    .concat(58, 64)
    .concat(91, 96)
    .concat(123, 126);
  const uppercaseCharCodes = arrayLowToHight(65, 90);

  rangeCharacters.addEventListener('input', syncCharAmount);
  numberCharacters.addEventListener('input', syncCharAmount);

  function syncCharAmount(e) {
    const valueAmount = e.target.value;

    rangeCharacters.value = valueAmount;
    numberCharacters.value = valueAmount;
  }

  formContainer.addEventListener('submit', (e) => {
    e.preventDefault();

    const characterAmount = numberCharacters.value;
    const includeUppercase = uppercaseEl.checked;
    const includeNumbers = numbersEl.checked;
    const includeSymbols = symbolsEl.checked;

    const password = generatePassword(
      characterAmount,
      includeUppercase,
      includeNumbers,
      includeSymbols
    );
    passwordDisplay.innerText = password;
  });

  function generatePassword(
    characterAmount,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) {
    let charCodes = lowercaseCharCodes;
    if (includeNumbers) {
      charCodes = charCodes.concat(numberCharCodes);
    }
    if (includeSymbols) {
      charCodes = charCodes.concat(symbolCharCodes);
    }
    if (includeUppercase) {
      charCodes = charCodes.concat(uppercaseCharCodes);
    }

    const passwordCharacters = [];
    for (let h = 0; h < characterAmount; h++) {
      let characterCodes =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(characterCodes));
    }
    return passwordCharacters.join('');
  }

  function arrayLowToHight(low, high) {
    let array = [];

    for (let i = low; i <= high; i++) {
      array.push(i);
    }
    return array;
  }
})();
