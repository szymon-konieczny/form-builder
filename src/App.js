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
    name: 'Text'
  }, {
    type: 'number',
    name: 'Number'
  }, {
    type: 'radio',
    name: 'Yes / No'
  }];

  componentDidMount = () => {
    this.setState({
      form: this.fetchFromLocalStorage() || []
    })
  };

  fetchFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem('form')) || [];
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

  onFormUpdate = (updateConfig) => {
    const { id, parentId, name, value } = updateConfig;
    console.log('1. App: ', updateConfig)
    const form = this.state.form;
    const updatedForm = form.map(item => item.id === id 
      ? item = { ...item, [name]: value } 
      : item );
    this.saveToLocalStorage(updatedForm || {});
  };

  onAddInput = (e) => {
    e.preventDefault();
    const form = this.fetchFromLocalStorage() || [];
    const levelNo = 0;

    const inputConfig = {
      id: uuid(),
      type: null,
      parentId: 0,
      subInputs: [],
      levelNo: levelNo
    };

    const updatedForm = [...form, inputConfig];
    this.saveToLocalStorage(updatedForm);
  };

  onAddSubInput = (data, parentId, id, parentLevelNo) => {
    console.log(parentId);

    const updatedForm = this.addSubInput(data, parentId, id, parentLevelNo);
    return this.saveToLocalStorage(updatedForm);
  };

  addSubInput = (data, parentId, id, parentLevelNo) => {
    const inputConfig = {
      id: id,
      parentId: parentId,
      type: null,
      subInputs: [],
      levelNo: parentLevelNo
    };

    data.map(element => {
      if (element.id === parentId) {
        element.levelNo = parentLevelNo + 1;
        element.subInputs = [ ...element.subInputs, inputConfig ];
      };
      this.onAddSubInput(element.subInputs, parentId, id, parentLevelNo + 1);
    });
    console.log('1: ', data);

    return data;
  };

  /* -- DELETE -- */

  onInputDelete = (data, targetId) => {
    const updatedData = this.deleteInput(data, targetId);
    return this.saveToLocalStorage(updatedData);
  };

  deleteInput(data, targetId) {
    const targetIndex = data.findIndex(element => element.id === targetId);
    
    if (targetIndex > -1) {
      data.splice(targetIndex, 1);
      return data;
    }
    
    data.forEach(element => {
      element.subInputs = this.onInputDelete(element.subInputs, element.id);
    });
    return data;
  };

  addLevels = (data, currentLevel = 0) => {
    data.forEach(element => {
      if (!element.parentId) {
        return currentLevel;
      }
      element.subInputs 
      && !this.isEmpty(element.subInputs) 
        ? this.addLevels(element.subInputs, currentLevel + 1) 
        : currentLevel;
    });
    return data;
  };

  printInputs = (data, types) => {
    return data && data.map(input => {
      const parentId = input.parentId;
      return (
        <div key={ input.id }>
          <Input
            levelNo={ '' }
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
          { input.subInputs && !this.isEmpty(input.subInputs) ? this.printInputs(input.subInputs) : input.subInputs = []
          }
        </div>
    )});
  };

  isEmpty = (array) => array && array.length === 0;

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
