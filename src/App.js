import * as React from 'react';

import { inputTypes } from './fixtures/inputTypes';
import { fetchFromLocalStorage } from './services/storage.service';
import {
  addInput,
  addSubInput,
  formUpdate, 
  deleteInput
} from './services/form.service';
import { Form } from './components/Form/index';

import './App.scss';

export default class App extends React.Component {
  
  state = {
    form: []
  };

  componentDidMount = () => this.onStateUpdate();

  onStateUpdate = () => this.setState({ form: fetchFromLocalStorage() || [] });

  onAddInput = (e) => {
    addInput(e);
    this.onStateUpdate();
  };

  onAddSubInput = (data, parentId, id) => {
    addSubInput(data, parentId, id);
  };

  onFormUpdate = (data, updateConfig) => {
    formUpdate(data, updateConfig);
    this.onStateUpdate();
  };

  onInputDelete = (data, targetId) => {
    deleteInput(data, targetId);
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
          stateUpdate={ this.onStateUpdate }
        />
      </div>
    );
  };
};
