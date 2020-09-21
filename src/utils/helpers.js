
  /* Randomize array in-place using Durstenfeld shuffle algorithm */
export const shuffleArray = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }

  return array
}

export const convertArrayToObject = (array) => {
  const convertedObject = array.reduce((updatedObject, element, index) => {

    return {
      ...updatedObject,
      [index]: element
    }
  }, {})
  return convertedObject
}

