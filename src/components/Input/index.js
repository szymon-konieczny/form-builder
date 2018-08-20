import * as React from 'react';
import { Conditions } from '../Conditions/index';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { inputTypes } from '../../fixtures/inputTypes';
import { makeIndentation } from '../../services/styles.service';

import './input.scss';

export class Input extends React.Component {

  state = {
    setType: true
  };

  style = {
    marginLeft: makeIndentation(20, this.props.levelNo)
  };

  componentDidMount = () => {
    this.isSubInputAddButtonActive(this.props.type);
  };

  handleOnChange = (e) => {
    e.preventDefault();
    const data = this.props.form || [];
    const id = e.target.dataset.id;
    const parentId = this.props.parentId;
    const name = e.target.name;
    const value = e.target.value;

    const updateConfig = {
      id,
      parentId,
      name,
      value
    };
    name === 'type' ? this.isSubInputAddButtonActive(name) : false;
    return this.props.handleUpdate(data, updateConfig);
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
    this.props.handleAddSubInput(data, parentId, id);
  };

  handleOnDelete = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const data = this.props.form || [];
    return this.props.handleDelete(data, id);
  };

  render() {
    const { id, parentId } = this.props;

    return (
      <div className="input-data" style={ this.style }>
        { !!parentId 
          && <Conditions 
              form={ this.props.form }
              parentType={ this.props.parentType } 
              conditionValue={ this.props.conditionValue }
              handleUpdate={ this.props.handleUpdate }
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
  form: PropTypes.arrayOf(PropTypes.object),
  id: PropTypes.string,
  levelNo: PropTypes.number,
  question: PropTypes.string,
  parentType: PropTypes.string,
  conditionValue: PropTypes.string,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  handleAddSubInput: PropTypes.func
};