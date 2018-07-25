import * as React from 'react';
import PropTypes from 'prop-types';
import './form.scss';

export default class Form extends React.Component {

  render() {
    const { inputTypes, form, printInputs, parent } = this.props;
    return (
      <form className="form-wrapper" >
        <h3 className="form-header">Form Builder</h3>
        {
          form && form.length > 0 
          ? printInputs(form, inputTypes)
          : <h4 className="form-header">Enjoy creating your form!</h4>
        }
        <button className="btn" onClick={ this.props.addInput }>Add Input</button>
      </form>
    );
  };
};

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object),
  inputTypes: PropTypes.arrayOf(PropTypes.object),
  updateInput: PropTypes.func,
  deleteInput: PropTypes.func,
  addInput: PropTypes.func,
  addSubInput: PropTypes.func,
  printInputs: PropTypes.func
};