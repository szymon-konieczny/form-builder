import * as React from 'react';

import { inputTypes } from './fixtures/inputTypes';

import { fetchFromLocalStorage } from './services/storage.service';
import { 
  isEmpty,
  addInput,
  addSubInput,
  formUpdate, 
  deleteInput
} from './services/form.service';

import { Form } from './components/Form/index';
import { Input } from './components/Input/index';

import './App.scss';

export default class App extends React.Component {
  
  state = {
    form: []
  };

  componentDidMount() {
    this.setState({
      form: fetchFromLocalStorage() || []
    });
  };

  onAddInput = (e) => addInput(e);
  onAddSubInput = (data, parentId, id) => addSubInput(data, parentId, id);
  onFormUpdate = (data, updateConfig) => formUpdate(data, updateConfig);
  onInputDelete = (data, targetId) => deleteInput(data, targetId);

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
            input.subInputs && !isEmpty(input.subInputs) ? this.printInputs(input.subInputs) : input.subInputs = []
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
