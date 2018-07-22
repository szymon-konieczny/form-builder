import * as React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

export default class Input extends React.Component {

  handleOnChange = (e) => {
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

    this.props.handleUpdate(updateConfig);
  };

  render() {
    
    const { id, parentId, question, types, type: typeOfInput } = this.props;

    return (
      <div className="input-data">
        { this.props.parentId && (
          <div>
            <h4>This is sub-input</h4>
            <h5>Parent ID: { parentId && parentId }</h5>
          </div>
        ) }
        <h5>My ID: { id } </h5>
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
            { types && types.map(type => (
              <option key={ type.name } value={ type.name } >{ type.name }</option>
            )) }
          </select>
        </label>
        <div className="button-wrapper">
          <button className="btn" 
            onClick={ this.props.handleAddSubInput }
            data-id={ id }
          >
            Add Sub-Input
          </button>
          <button className="btn" 
            onClick={ this.props.handleDelete } 
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
  id: PropTypes.string,
  question: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  handleDelete: PropTypes.func,
  handleChange: PropTypes.func,
  handleAddInput: PropTypes.func
};