import * as React from 'react';
import PropTypes from 'prop-types';
import { FormCreatorInput } from '../FormCreatorInput/index';
import { addInput, isEmpty } from '../../services/form-creator.service';
import './form-creator.scss';

export class FormCreator extends React.Component {

  static propTypes = {
    form: PropTypes.arrayOf(PropTypes.object).isRequired,
    stateUpdate: PropTypes.func
  };

  printInputs = (data) => {
    return data && data.map(input => {
      return (
        <div key={ input.id }>
          <FormCreatorInput
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
            input.subInputs && !isEmpty(input.subInputs) 
              ? this.printInputs(input.subInputs) 
              : input.subInputs = []
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
    const { 
      props: {
        form, 
        stateUpdate
      },
      handleAddInput,
      printInputs
    } = this;

    return (
      <div className="form-wrapper">
        <form onChange={ stateUpdate } >
          {
            form && form.length > 0 
            ? printInputs(form)
            : <h3 className="message">Enjoy creating your form!</h3>
          }
        </form>
        <button className="btn" onClick={ handleAddInput }>Add Input</button>
      </div>
    );
  };
};