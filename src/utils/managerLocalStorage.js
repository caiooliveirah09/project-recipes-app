const managerIngredients = {

  checkeds: (id) => {
    const ingredientsUsed = JSON.parse(localStorage.getItem('usedIngredients'));

    if (ingredientsUsed[id]) {
      return ingredientsUsed[id];
    }
    return [];
  },

  getCheckedIngredients: (id, ingredient) => {
    const ingredientsUsed = JSON.parse(localStorage.getItem('usedIngredients'));

    const verify = ingredientsUsed[id];

    return verify.includes(ingredient);
  },

  removeIngredients: (id, ingredient) => {
    const ingredientsUsed = JSON.parse(localStorage.getItem('usedIngredients'));

    const verify = ingredientsUsed[id];

    localStorage.setItem('usedIngredients', JSON.stringify({
      ...ingredientsUsed,
      [id]: verify.filter((use) => use !== ingredient),
    }));
  },

  addIngredient: (id, ingredient) => {
    const ingredientsUsed = JSON.parse(localStorage.getItem('usedIngredients'));

    const verify = ingredientsUsed[id];

    if (!verify) {
      localStorage.setItem('usedIngredients', JSON.stringify({
        ...ingredientsUsed,
        [id]: [ingredient],
      }));
    } else {
      localStorage.setItem('usedIngredients', JSON.stringify({
        ...ingredientsUsed,
        [id]: [...ingredientsUsed[id], ingredient],
      }));
    }

    console.log(verify);
  },
  verifyLocalStorage: (id) => {
    if (!localStorage.getItem('usedIngredients')) {
      localStorage.setItem('usedIngredients', JSON.stringify({}));
    }
    const currentStorage = JSON.parse(localStorage.getItem('usedIngredients'));
    if (!currentStorage[id]) {
      localStorage.setItem('usedIngredients', JSON.stringify(
        { ...currentStorage, [id]: [] },
      ));
    }
    return managerIngredients;
  },
};

export default managerIngredients;
