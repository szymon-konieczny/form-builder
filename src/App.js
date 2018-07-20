import * as React from 'react';
import uuid from 'uuid';
import Form from './components/Form/index';
import './App.scss';

export default class App extends React.Component {
  
  state = {
    inputTypes: [{
      type: 'text',
      name: 'Text'
    }, {
      type: 'number',
      name: 'Number'
    }, {
      type: 'radio',
      name: 'Yes / No'
    }],
    form: []
  };

  defaultInput = {
    id: null,
    parentId: null,
    question: '',
    type: this.state.inputTypes
  }

  onFormUpdate = (formData) => {
    const { form } = this.state;

    const inputConfig = {
      ...this.defaultInput,
      id: uuid()
    };

    this.setState({
      form: [...form, inputConfig]
    });
  };

  onInputDelete = (id) => {
    const { form } = this.state;
    const newForm = form.filter(item => item.id !== id).map(item => item);
    this.setState({
      form: newForm
    });
  };

  render() {
    return (
      <div className="App">
        <Form 
          form={ this.state.form } 
          types={ this.state.inputTypes } 
          update={ this.onFormUpdate }
          delete={ this.onInputDelete }
        />
      </div>
    );
  };
};
