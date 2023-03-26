textInsertName.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      btnInsert.click();
    }
  });
  