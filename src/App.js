import * as React from 'react';
import uuid from 'uuid';
import Form from './components/Form/index';
import './App.scss';

export default class App extends React.Component {
  
  state = {
    form: []
  };

  inputTypes = [{
    type: 'text',
    name: 'Text'
  }, {
    type: 'number',
    name: 'Number'
  }, {
    type: 'radio',
    name: 'Yes / No'
  }];

  defaultInput = {
    id: null,
    parentId: null,
    question: '',
    type: this.inputTypes
  };

  componentDidMount = () => this.setState({
    form: this.fetchFromLocalStorage() || []
  });

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
      console.log('Saving to local storage failed: ', error)
    }; 
  };

  onFormUpdate = () => {
    const inputConfig = {
      ...inputConfig,
      id: uuid()
    };
    
    const formData = [...this.fetchFromLocalStorage(), inputConfig];
    this.saveToLocalStorage(formData);
  };

  onInputDelete = (id) => {
    const form = this.fetchFromLocalStorage();
    const newForm = form.filter(item => item.id !== id).map(item => item);
    this.saveToLocalStorage(newForm);
  };

  render() {
    return (
      <div className="App">
        <Form 
          form={ this.state.form } 
          types={ this.inputTypes } 
          update={ this.onFormUpdate }
          delete={ this.onInputDelete }
        />
      </div>
    );
  };
};
