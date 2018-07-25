import * as React from 'react';
import uuid from 'uuid';

import Form from './components/Form/index';
import Input from './components/Input/index';

import './App.scss';

export default class App extends React.Component {
  
  state = {
    form: []
  };

  inputTypes = [{
    type: '',
    name: ''
  }, {
    type: 'text',
    name: 'Text',
    conditions: ['Equals']
  }, {
    type: 'number',
    name: 'Number',
    conditions: ['Greater than', 'Equals', 'Less than']
  }, {
    type: 'radio',
    name: 'Yes / No',
    conditions: ['Yes', 'No']
  }];

  componentDidMount() {
    this.setState({
      form: this.fetchFromLocalStorage() || []
    });
  };

  fetchFromLocalStorage = () => {
    try {
      const dataFromLS =  JSON.parse(localStorage.getItem('form')) || [];
      return dataFromLS;
      // return this.addLevels(dataFromLS);
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
      })
    }
    catch(error) {
      console.log('Saving data to local storage failed: ', error)
    }; 
  };

  isEmpty = (array) => array && array.length === 0;

  findParent = (data, parentId) => {
    const elements = this.flattenInputs(data) || [];
    return elements.filter(element => element.id === parentId);
  };

  flattenInputs = (data, result = []) => {
    data.forEach(element => {
      result = [...result, element];
      console.log('flattenInputs: ', element)
      this.flattenInputs(element.subInputs, result);
    });
    return result.map(element => element);
  };

  // addLevels = (data, currentLevel = 0) => {
  //   data.forEach(element => {
  //     if (!element.parentId) {
  //       return currentLevel;
  //     }
  //     element.subInputs 
  //     && !this.isEmpty(element.subInputs) 
  //       ? this.addLevels(element.subInputs, currentLevel + 1) 
  //       : currentLevel;
  //   });
  //   return data;
  // };

  onFormUpdate = (data, updateConfig) => {
    const updatedForm = this.formUpdate(data, updateConfig)
    return this.saveToLocalStorage(updatedForm);
  };

  formUpdate = (data, updateConfig) => {
    const { id, name, value } = updateConfig;

    data.forEach(element => element.id === id 
      ? element = { ...element, [name]: value } 
      : this.onFormUpdate(element.subInputs, updateConfig) );
    return data;
  };

  onAddInput = (e) => {
    e.preventDefault();
    const form = this.fetchFromLocalStorage();

    const inputConfig = {
      id: uuid(),
      type: null,
      parentId: 0,
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
   
    const tmp = parent.map(child => child);
    console.log(tmp);
    console.log(data);
    console.log(parentId);
    // const levelNo = parent.levelNo;

    const levelNo = 0;
    const inputConfig = {
      id: id,
      parentId: parentId,
      type: null,
      subInputs: [],
      levelNo: levelNo + 1
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
    };
    
    data.forEach(element => {
      element.subInputs = this.onInputDelete(element.subInputs, element.id);
    });
    return data;
  };

  printInputs = (data, types) => {
    return data && data.map(input => {
      const parentId = input.parentId;
      return (
        <div key={ input.id }>
          <Input
            parent={ this.findParent }
            levelNo={ input.levelNo || 0 }
            form={ this.state.form }
            id={ input.id }
            parentId={ parentId }
            question={ input.question || '' }
            type={ input.type }
            types={ types }
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
          inputTypes={ this.inputTypes } 
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
