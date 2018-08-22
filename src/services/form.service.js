import uuid from 'uuid';
import { fetchFromLocalStorage, saveToLocalStorage } from './storage.service';

export const isEmpty = (array) => array && array.length === 0;

const flattenInputs = (data, result = []) => {
  data && data.forEach(element => {
    result = [...result, element];
    flattenInputs(element.subInputs, result);
  });
  return result.map(element => element) || [];
};

const findParent = (data, parentId) => {
  const elements = flattenInputs(data) || [];
  return elements.filter(element => element.id === parentId)[0];
};

// ADDING INPUTS:
export const addInput = (e) => {
  e.preventDefault();
  const form = fetchFromLocalStorage();
  const inputConfig = {
    id: uuid(),
    type: null,
    question: null,
    parentId: undefined,
    levelNo: 0,
    subInputs: []
  };
  const updatedForm = [...form, inputConfig];
  return saveToLocalStorage(updatedForm);
};

// ADDING SUB-INPUTS
export const addSubInput = (data, parentId, id) => {
  const updatedForm = traverseAndAddSubInput(data, parentId, id);
  return saveToLocalStorage(updatedForm);
};

const traverseAndAddSubInput = (data, parentId, id) => {
  const parent = findParent(data, parentId);
  const levelNo = parent && parent.levelNo || 0;
  const parentType = parent && parent.type || '';

  const inputConfig = {
    id: id,
    parentId: parentId,
    type: null,
    parentType: parentType,
    question: null,
    levelNo: levelNo + 1,
    condition: 'Equals',
    conditionValue: null,
    subInputs: []
  };

  data.forEach(element => {
    if (element.id === parentId) {
      return element.subInputs = [ ...element.subInputs, inputConfig ]
    };
    addSubInput(element.subInputs, parentId, id);
  });
  return data;
};

// UPDATING INPUTS:
export const formUpdate = (data, updateConfig) => {
  const updatedForm = traverseAndFormUpdate(data, updateConfig);
  return saveToLocalStorage(updatedForm);
};

const traverseAndFormUpdate = (data, updateConfig) => {
  const { id, name, value } = updateConfig;

  data.forEach(element => {
    if (element.id === id) {
      element[name] = value;
      element.subInputs && element.subInputs.forEach(item => {
        if (item.parentId === id) {
          item.parentType = element.type;
          return item;
        };
        return item;
      });
      return element;
    } else if (element.subInputs.length > -1) {
      formUpdate(element.subInputs, updateConfig)
    };
  });
  return data;
};

// DELETING INPUTS:
export const deleteInput = (data, targetId) => {
  const updatedData = traverseAndDeleteInput(data, targetId);
  return saveToLocalStorage(updatedData);
};

const traverseAndDeleteInput = (data, targetId) => {
  const targetIndex = data.findIndex(element => element.id === targetId);
  
  if (targetIndex > -1) {
    data.splice(targetIndex, 1);
  } else {
    return data = data.map(element => {
      element.subInputs = traverseAndDeleteInput(element.subInputs, targetId);
      return element;
    });
  };
  return data;
};