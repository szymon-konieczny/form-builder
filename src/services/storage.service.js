export const fetchFromLocalStorage = () => JSON.parse(localStorage.getItem('form')) || [];

export const saveToLocalStorage = (formData) => {
    const form = [...formData || []];
    const storageData = JSON.stringify(form);
    localStorage.setItem('form', storageData);
};