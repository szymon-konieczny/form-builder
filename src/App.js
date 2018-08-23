import * as React from 'react';
import { fetchFromLocalStorage } from './services/storage.service';
import { Tabs } from './components/Tabs/index';
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
    const { onStateUpdate } = this;

    return (
      <main className="App">
        <h2 className="form-header">Form Builder</h2>
        <Tabs>
          <section label="Create">
            <Form
              form={ this.state.form }
              stateUpdate={ onStateUpdate }
            />
          </section>

          <section label="Preview">
          <h3 className="message">Preview section here!</h3>
          </section>

          <section label="Export">
            <h3 className="message">Export section here!</h3>
          </section>
        </Tabs>
      </main>
    );
  };
};
