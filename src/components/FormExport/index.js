import * as React from 'react';
import PropTypes from 'prop-types';
import './form-export.scss';

export class FormExport extends React.Component {

  showOutputData = () => {
    const data = this.props.form;
    return data && data.length > 0 
      ? JSON.stringify(data, undefined, 2) 
      : 'Nothing to show yet. Please create your form first. ;)';
  };

  render(){
    return (
      <form>
        <textarea 
          className="form-export-output"
          defaultValue={ this.showOutputData() }
        />
      </form>
    );
  };
};