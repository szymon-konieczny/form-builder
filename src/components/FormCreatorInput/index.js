import * as React from 'react';
import { FormCreatorInputConditions } from '../FormCreatorInputConditions/index';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { inputTypes } from '../../fixtures/inputTypes';
import { getIndentationValueInPx } from '../../services/styles.service';
import { addSubInput, formUpdate, deleteInput } from '../../services/form-creator.service';

import './input.scss';

export class FormCreatorInput extends React.Component {

  static propTypes = {
    levelNo: PropTypes.number,
    form: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.string,
    parentId: PropTypes.string,
    parentType: PropTypes.string,
    question: PropTypes.string,
    condition: PropTypes.string,
    conditionValue: PropTypes.string,
    stateUpdate: PropTypes.func,
  };
  
  state = {
    setType: true
  };

  style = {
    marginLeft: getIndentationValueInPx(20, this.props.levelNo)
  };

  componentDidMount = () => this.isSubInputAddButtonActive(this.props.type);

  isSubInputAddButtonActive = type => {
    if (!type) {
      this.setState({
        setType: true
      });
    } else {
      this.setState({
        setType: false
      });
    };
  };

  handleOnChange = e => {
    e.preventDefault();
    const { form, parentId, stateUpdate } = this.props;
    const data = form || [];
    const id = e.target.dataset.id;
    const name = e.target.name;
    const value = e.target.value || null;

    const updateConfig = {
      id,
      parentId,
      name,
      value
    };
    name === 'type' ? this.isSubInputAddButtonActive(name) : false;
    formUpdate(data, updateConfig);
    stateUpdate();
  };

  handleOnAddSubInput = e => {
    e.preventDefault();
    const { form, stateUpdate } = this.props;
    const data = form || [];
    const id = uuid();
    const parentId = e.target.dataset.id;
    addSubInput(data, parentId, id);
    stateUpdate();
  };

  handleOnDelete = e => {
    e.preventDefault();
    const { form, stateUpdate } = this.props;
    const id = e.target.dataset.id;
    const data = form || [];
    deleteInput(data, id);
    stateUpdate();
  };

  render = () => {
    const { 
      props: { 
        form, id, question, parentId, parentType, type, condition, conditionValue 
      },
      state: {
        setType
      },
      handleOnChange,
      handleOnAddSubInput,
      handleOnDelete
     } = this;

    return (
      <div className="input-data" style={ this.style }>
        { !!parentId 
          && <FormCreatorInputConditions 
              id={ id }
              type={ type }
              condition={ condition }
              conditionValue={ conditionValue }
              form={ form }
              parentType={ parentType }
            /> 
        }
        <label htmlFor="question" className="input-label">Question: 
          <input type="text" name="question" 
            defaultValue={ question || '' }
            data-id={ id }
            onChange={ handleOnChange }
            className="input"
            required
          />
        </label>
        <label htmlFor="type" className="input-label">Type: 
          <select name="type"
            data-id={ id }
            value={ type || '' }
            onChange={ handleOnChange } 
            className="input select"
            required
          >
            { inputTypes && inputTypes.map(type => {
              return (
                <option key={ type.type } value={ type.type } >{ type.name }</option>
            )})
          }
          </select>
        </label>

        <div className="button-wrapper">
          <button className="btn" 
            onClick={ handleOnAddSubInput }
            data-id={ id }
            disabled={ setType }
          >
            Add Sub-Input
          </button>

          <button className="btn" 
            onClick={ handleOnDelete } 
            data-id={ id } 
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
};