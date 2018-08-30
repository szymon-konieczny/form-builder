import * as React from 'react';
import { fetchFromLocalStorage } from '../../services/storage.service';
import { FormPreviewItem } from '../FormPreviewItem/index';

export class FormPreview extends React.Component {

  displayForm = data => data.map(element => {
    return (
      <div key={ element.id }>
        <FormPreviewItem input={ element } />
      </div>
    )}
  );
  
  render(){
    const {
      displayForm
    } = this;

    const data = fetchFromLocalStorage();

    return (
      <form>
        {
          data && data.length > 0
          ? displayForm(data)
          : <h3 className="message">Create your form first!</h3>
        }
      </form>
    );
  };
};