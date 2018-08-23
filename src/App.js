import * as React from 'react';
import { fetchFromLocalStorage } from './services/storage.service';
import { Form } from './components/Form/index';
import './App.scss';

export class App extends React.Component {
  
  state = {
    form: []
  };

  componentDidMount = () => this.onStateUpdate();

  onStateUpdate = () => this.setState({ 
    form: fetchFromLocalStorage() || [] 
  });

  render() {
    return (
      <main className="App">
        <Form
          form={ this.state.form }
          stateUpdate={ this.onStateUpdate }
        />
      </main>
    );
  };
};
