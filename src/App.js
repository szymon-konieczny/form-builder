import * as React from 'react';
import { fetchFromLocalStorage } from './services/storage.service';
import { Tabs } from './components/Tabs/index';
import { FormCreator } from './components/FormCreator/index';
import { FormPreview } from './components/FormPreview/index';
import { FormExport } from './components/FormExport/index';
import './App.scss';

export class App extends React.Component {
  
  state = {
    form: [],
    conditionValue: undefined
  };

  componentDidMount = () => this.onStateUpdate();

  onStateUpdate = () => this.setState({ form: fetchFromLocalStorage() || [] });

  render() {
    const { 
      state: {
        form,
        conditionValue
      },
      onStateUpdate, 
      onConditionValueUpdate 
    } = this;

    return (
      <main className="App">
        <h2 className="form-header">Form Builder</h2>
        <Tabs>
          <section label="Create">
            <FormCreator
              form={ form }
              stateUpdate={ onStateUpdate }
            />
          </section>
         
          <section label="Preview">
            <FormPreview 
              conditionValue={ conditionValue }
            />
          </section>

          <section label="Export">
            <FormExport 
              form={ form }
            />
          </section>
        </Tabs>
      </main>
    );
  };
};
