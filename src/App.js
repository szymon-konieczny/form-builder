import * as React from 'react';
import uuid from 'uuid';
import inputTypes from './fixtures/inputTypes';

import Form from './components/Form/index';
import Input from './components/Input/index';

import './App.scss';

export default class App extends React.Component {
  
  state = {
    form: []
  };

  componentDidMount() {
    this.setState({
      form: this.fetchFromLocalStorage() || []
    });
  };

  fetchFromLocalStorage = () => {
    try {
      const dataFromLS =  JSON.parse(localStorage.getItem('form')) || [];
      return dataFromLS;
    }
    catch(error) {
      console.log('Fetching data from local storage failed: ', error)
    };
  };

  saveToLocalStorage = (formData) => {
    try {
      const form = [...formData || []];
      const storageData = JSON.stringify(form);
      localStorage.setItem('form', storageData);
      this.setState({
        form: this.fetchFromLocalStorage() || []
      });
    }
    catch(error) {
      console.log('Saving data to local storage failed: ', error)
    };
  };

  isEmpty = (array) => array && array.length === 0;

  findParent = (data, parentId) => {
    const elements = this.flattenInputs(data) || [];
    return elements.filter(element => element.id === parentId)[0];
  };

  flattenInputs = (data, result = []) => {
    data && data.forEach(element => {
      result = [...result, element];
      this.flattenInputs(element.subInputs, result);
    });
    return result.map(element => element) || [];
  };

  onFormUpdate = (data, updateConfig) => {
    const updatedForm = this.formUpdate(data, updateConfig);
    console.log(updatedForm);
    return this.saveToLocalStorage(updatedForm);
  };

  formUpdate = (data, updateConfig) => {
    const { id, name, value } = updateConfig;

    console.log(updateConfig);
    
    data.map(element => {
      
      if (element.id === id) {
        return data = [{ ...element, [name]: value }];
      };
      this.onFormUpdate(element.subInputs, updateConfig)
    });
    return data;
  };

  onAddInput = (e) => {
    e.preventDefault();
    const form = this.fetchFromLocalStorage();

    const inputConfig = {
      id: uuid(),
      type: null,
      question: null,
      parentId: 0,
      levelNo: 0,
      subInputs: []
    };

    const updatedForm = [...form, inputConfig];
    return this.saveToLocalStorage(updatedForm);
  };

  onAddSubInput = (data, parentId, id) => {
    const updatedForm = this.addSubInput(data, parentId, id);
    return this.saveToLocalStorage(updatedForm);
  };

  addSubInput = (data, parentId, id) => {
    const parent = this.findParent(data, parentId);
    const levelNo = parent && parent.levelNo || 0;
    const parentType = parent && parent.type || '';

    const inputConfig = {
      id: id,
      parentId: parentId,
      type: null,
      parentType: parentType,
      question: null,
      levelNo: levelNo + 1,
      condition: null,
      conditionValue: null,
      subInputs: []
    };

    data.forEach(element => {
      if (element.id === parentId) {
        return element.subInputs = [ ...element.subInputs, inputConfig ]
      };
      this.onAddSubInput(element.subInputs, parentId, id);
    });
    return data;
  };

  onInputDelete = (data, targetId) => {
    const updatedData = this.deleteInput(data, targetId);
    return this.saveToLocalStorage(updatedData);
  };

  deleteInput(data, targetId) {
    const targetIndex = data.findIndex(element => element.id === targetId);
    
    if (targetIndex > -1) {
      data.splice(targetIndex, 1);
      return data;
    } else {
      data.forEach(element => element.subInputs = this.onInputDelete(element.subInputs, targetId));
      return data;
    }
  };

  printInputs = (data) => {
    return data && data.map(input => {
      return (
        <div key={ input.id }>
          <Input
            levelNo={ input.levelNo || 0 }
            form={ this.state.form }
            id={ input.id }
            parentId={ input.parentId }
            parentType={ input.parentType }
            question={ input.question }
            type={ input.type }
            conditionValue={ input.conditionValue }
            handleDelete={ this.onInputDelete }
            handleUpdate={ this.onFormUpdate }
            handleAddSubInput={ this.onAddSubInput }
          />
          { 
            input.subInputs && !this.isEmpty(input.subInputs) ? this.printInputs(input.subInputs) : input.subInputs = []
          }
        </div>
    )});
  };

  render() {
    return (
      <div className="App">
        <Form
          form={ this.state.form } 
          inputTypes={ inputTypes } 
          addInput={ this.onAddInput }
          addSubInput={ this.onAddSubInput }
          updateInput={ this.onFormUpdate }
          deleteInput={ this.onInputDelete }
          printInputs={ this.printInputs }
        />
      </div>
    );
  };
};
