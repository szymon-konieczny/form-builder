import * as React from 'react';
import { Conditions } from '../Conditions/index';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { inputTypes } from '../../fixtures/inputTypes';
import { getIndentationValueInPx } from '../../services/styles.service';
import { addSubInput, formUpdate, deleteInput } from '../../services/form.service';

import './input.scss';

export class Input extends React.Component {

  state = {
    setType: true
  };

  style = {
    marginLeft: getIndentationValueInPx(20, this.props.levelNo)
  };

  componentDidMount = () => {
    this.isSubInputAddButtonActive(this.props.type);
  };

  handleOnChange = (e) => {
    e.preventDefault();
    const data = this.props.form || [];
    const id = e.target.dataset.id;
    const parentId = this.props.parentId || undefined;
    const name = e.target.name;
    const value = e.target.value;

    const updateConfig = {
      id,
      parentId,
      name,
      value
    };
    name === 'type' ? this.isSubInputAddButtonActive(name) : false;
    formUpdate(data, updateConfig);
    this.props.stateUpdate();
  };

  isSubInputAddButtonActive = (type) => {
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

  handleOnAddSubInput = (e) => {
    e.preventDefault();
    const data = this.props.form || [];
    const id = uuid();
    const parentId = e.target.dataset.id;
    addSubInput(data, parentId, id);
    this.props.stateUpdate();
  };

  handleOnDelete = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const data = this.props.form || [];
    deleteInput(data, id);
    this.props.stateUpdate();
  };

  render() {
    const { id, parentId, type, condition, conditionValue } = this.props;

    return (
      <div className="input-data" style={ this.style }>
        { !!parentId 
          && <Conditions 
              id={ id }
              type={ type }
              condition={ condition }
              conditionValue={ conditionValue }
              form={ this.props.form }
              parentType={ this.props.parentType }
            /> 
        }

        <label htmlFor="question" className="input-label">Question: 
          <input type="text" name="question" 
            defaultValue={ this.props.question || '' }
            data-id={ id }
            onChange={ this.handleOnChange }
            className="input"
            required
          />
        </label>
        <label htmlFor="type" className="input-label">Type: 
          <select name="type"
            data-id={ id }
            value={ this.props.type || '' }
            onChange={ this.handleOnChange } 
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
            onClick={ this.handleOnAddSubInput }
            data-id={ id }
            disabled={ this.state.setType }
          >
            Add Sub-Input
          </button>
          <button className="btn" 
            onClick={ this.handleOnDelete } 
            data-id={ id } 
          >
            Delete
          </button>
        </div>
      </div>
    );
  };
};

Input.propTypes = {
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