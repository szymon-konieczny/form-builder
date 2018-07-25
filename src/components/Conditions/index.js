import * as React from 'react';
import PropTypes from 'prop-types';

export default class Conditions extends React.Component {

  conditionSelect = () => {
    console.log('Conditions component here!');
  };

  render() {
    return (
      <div className="conditions-wrapper">
        <label htmlFor="condition" className="input-label">Condition:
          <select>
            <option>Equals</option>
          </select>
          <input type="text" className="input" />
        </label>
      </div>    
    )
  };
};