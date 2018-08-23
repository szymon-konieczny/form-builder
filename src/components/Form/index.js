import * as React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input/index';
import { addInput, isEmpty } from '../../services/form.service';
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

  handleAddInput = (e) => {
    e.preventDefault();
    addInput();
    this.props.stateUpdate();
  };

  render() {
    const { form, stateUpdate } = this.props;
    return (
      <section className="form-wrapper">
        <form onChange={ stateUpdate } >
          <h3 className="form-header">Form Builder</h3>
          {
            form && form.length > 0 
            ? this.printInputs(form)
            : <h4 className="form-header">Enjoy creating your form!</h4>
          }
        </form>
        <button className="btn" onClick={ this.handleAddInput }>Add Input</button>
      </section>
    );
  };
};

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object),
  stateUpdate: PropTypes.func
};