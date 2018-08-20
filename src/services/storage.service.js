export const fetchFromLocalStorage = () => {
  try {
    const dataFromLS =  JSON.parse(localStorage.getItem('form')) || [];
    return dataFromLS;
  }
  catch(error) {
    console.log('Fetching data from local storage failed: ', error)
  };
};

export const saveToLocalStorage = (formData) => {
  try {
    const form = [...formData || []];
    const storageData = JSON.stringify(form);
    localStorage.setItem('form', storageData);
  }
  catch(error) {
    console.log('Saving data to local storage failed: ', error)
  };
};