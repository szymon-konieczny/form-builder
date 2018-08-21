import * as React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input/index';
import { isEmpty } from '../../services/form.service';
import './form.scss';

export class Form extends React.Component {

  printInputs = (data) => {
    return data && data.map(input => {
      return (
        <div key={ input.id }>
          <Input
            levelNo={ input.levelNo || 0 }
            form={ this.props.form }
            id={ input.id }
            parentId={ input.parentId }
            parentType={ input.parentType }
            question={ input.question }
            type={ input.type }
            condition={ input.condition }
            conditionValue={ input.conditionValue }
            stateUpdate={ this.props.stateUpdate }
          />
          { 
            input.subInputs && !isEmpty(input.subInputs) ? this.printInputs(input.subInputs) : input.subInputs = []
          }
        </div>
    )});
  };

  render() {
    const { form, stateUpdate } = this.props;
    return (
      <form className="form-wrapper" onChange={ stateUpdate } >
        <h3 className="form-header">Form Builder</h3>
        {
          form && form.length > 0 
          ? this.printInputs(form)
          : <h4 className="form-header">Enjoy creating your form!</h4>
        }
        <button className="btn" onClick={ this.props.addInput }>Add Input</button>
      </form>
    );
  };
};

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object),
  inputTypes: PropTypes.array,
  addInput: PropTypes.func,
  addSubInput: PropTypes.func,
  updateInput: PropTypes.func,
  deleteInput: PropTypes.func,
  stateUpdate: PropTypes.func
};