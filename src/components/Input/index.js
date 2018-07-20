import * as React from 'react';
import PropTypes from 'prop-types';
import './input.scss';

export default class Input extends React.Component {

  onChange = () => {
    console.log('Change!');
  };

  render() {
    const { id, question, types } = this.props;
    return (
      <div key={ id } className="input-data">
        <label htmlFor="question" className="input-label">Question: 
          <input type="text" name="question" 
            defaultValue={ question } 
            onChange={ this.onChange }
            className="input"
          />
        </label>
        <label htmlFor="type" className="input-label">Type: 
          <select name="type" defaultValue={ question } 
            onChange={ this.onChange } 
            className="input select"
          >
            { types.map(type => (
              <option key={ type.name } >{ type.name }</option>
            )) }
          </select>
        </label>
        <div className="button-wrapper">
          <button className="btn">Add Sub-Input</button>
          <button className="btn" onClick={ this.props.handleDelete } data-id={ id } >Delete</button>
        </div>
      </div>
    );
  };
};

Input.propTypes = {
  id: PropTypes.number,
  question: PropTypes.string,
  types: PropTypes.arrayOf(PropTypes.object),
  handleDelete: PropTypes.func
};