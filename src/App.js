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
      const form = [...formData];
      const storageData = JSON.stringify(form);
      localStorage.setItem('form', storageData);
      this.setState({
        form: this.fetchFromLocalStorage()
      })
    }
    catch(error) {
      console.log('Saving data to local storage failed: ', error)
    }; 
  };

  onFormUpdate = (updateConfig) => {
    const { id, parentId, name, value } = updateConfig;
    console.log(updateConfig)
    const form = this.state.form;
    const updatedForm = form.map(item => item.id === id 
      ? item = { ...item, [name]: value } 
      : item );
    this.saveToLocalStorage(updatedForm);
  };

  onAddInput = (e) => {
    e.preventDefault();
    const form = this.fetchFromLocalStorage();

    const inputConfig = {
      id: uuid(),
      type: null,
      parentId: null,
      subInputs: []
    };

    const updatedForm = [...form, inputConfig];
    this.saveToLocalStorage(updatedForm);
  };

  onAddSubInput = (e) => {
    e.preventDefault();
    const parentId = e.target.dataset.id;
    const form = this.fetchFromLocalStorage();

    const inputConfig = {
      id: uuid(),
      type: null,
      parentId: parentId,
      subInputs: []
    };
   
    const updatedForm = form.map(item => item.id === parentId 
      ? item = { ...item, subInputs: [...item.subInputs, inputConfig] } 
      : item );

    this.saveToLocalStorage(updatedForm);

    console.log('Sub-Input has been added!', parentId)
  };

  onInputDelete = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    console.log(id);
    const form = this.fetchFromLocalStorage();
    
    const newForm = form.filter(item => item.id !== id).map(item => item);
    console.log(newForm);
    this.saveToLocalStorage(newForm);
  };

  printInputs = (array, types) => {
    return array.map(input => (
      <div key={ input.id }>
        <Input
          id={ input.id }
          parentId={ input.parentId }
          question={ input.question || '' }
          type={ input.type }
          types={ types }
          handleDelete={ this.onInputDelete }
          handleUpdate={ this.onFormUpdate }
          handleAddSubInput={ this.onAddSubInput }
        /> 
        { !this.isEmpty(input.subInputs) ? this.printInputs(input.subInputs) : false
        }
      </div>
    ));
  };

  isEmpty = (array) => {
    return array.length === 0;
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
