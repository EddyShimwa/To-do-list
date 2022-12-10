export const validateForm = (
  str, required = false, minLength = 0, maxLength = 0, specialChar = true,
) => {
  let isError = false;
  let msg = '';
  str = str.trim();
  const len = str.length;

  if (required) {
    if (str.length <= 0) {
      isError = true;
      msg = 'This is a required field!';
      return { isError, msg };
    }
  }

  if (minLength > 0) {
    if (len < minLength) {
      isError = true;
      msg = `The minimum number of characters to enter as todo is ${minLength}`;
      return { isError, msg };
    }
  }

  if (maxLength > 0) {
    if (len > maxLength) {
      isError = true;
      msg = `The bare minimum of characters required for todo entry is ${maxLength}`;
      return { isError, msg };
    }
  }

  if (!specialChar) {
    const newStr = str.replace(/\s/g, '');
    const re = /^[A-Za-z][A-Za-z0-9-_.]*$/;
    if (!re.test(newStr)) {
      isError = true;
      msg = 'This field only accepts A-z0-9_.- characters and the first character should be A to z';
      return { isError, msg };
    }
  }
  return { isError, msg };
};

export const getAfterElement = (todoContainer, y) => {
  const dragFilterElements = [...todoContainer.querySelectorAll('.todo-item:not(.dragging)')];

  return dragFilterElements.reduce((nearest, item) => {
    // get the box content
    const box = item.getBoundingClientRect();

    // calculate the offset
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > nearest.offset) {
      return { offset, element: item };
    }
    return nearest;
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};