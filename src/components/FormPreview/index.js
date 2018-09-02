import * as React from 'react';
import { fetchFromLocalStorage } from '../../services/storage.service';
import { FormPreviewItem } from '../FormPreviewItem/index';
import './form-preview.scss';

export class FormPreview extends React.Component {

  displayForm = data => data.map(element => <FormPreviewItem key={ element.id } input={ element } />);
  
  render = () => {
    const { displayForm } = this;
    const data = fetchFromLocalStorage();
    const isDataExisting = data && data.length > 0;
    const noDataInfo = <h3 className="message">Create your form first :)</h3>;

    return (
      <form className="form-preview-wrapper">
        { isDataExisting ? displayForm(data) :  noDataInfo }
      </form>
    );
  };
};