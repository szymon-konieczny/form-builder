import * as React from 'react';
import Conditions from '../Conditions/index';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import './input.scss';

export default class Input extends React.Component {

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

    return this.props.handleUpdate(data, updateConfig);
  };

  handleOnAddSubInput = (e) => {
    e.preventDefault();
    const data = this.props.form || [];
    const id = uuid();
    const parentId = e.target.dataset.id;
    console.log(data);
    return this.props.handleAddSubInput(data, parentId, id);
  };

  handleOnDelete = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    const data = this.props.form || [];
    return this.props.handleDelete(data, id);
  };

  render() {
    const data = this.props.form || [];
    const { id, parentId, question, types, type: typeOfInput } = this.props;
    let levelNo;
    return (
      <div className="input-data">

        { parentId && <Conditions /> }

        <label htmlFor="question" className="input-label">Question: 
          <input type="text" name="question" 
            defaultValue={ question }
            data-id={ id }
            onChange={ this.handleOnChange }
            className="input"
            required
          />
        </label>
        <label htmlFor="type" className="input-label">Type: 
          <select name="type"
            data-id={ id }
            value={ typeOfInput || '' }
            onChange={ this.handleOnChange } 
            className="input select"
            required
          >
            { types && types.map(type => {
              return (
                <option key={ type.name } value={ type.name } >{ type.name }</option>
            )})
          }
          </select>
        </label>
        <div className="button-wrapper">
          <button className="btn" 
            onClick={ this.handleOnAddSubInput }
            data-id={ id }
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
  question: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  handleAddInput: PropTypes.func
};