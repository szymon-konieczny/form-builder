import * as React from 'react';
import PropTypes from 'prop-types';
import { inputTypes } from '../../fixtures/inputTypes';
import { formUpdate } from '../../services/form.service';

import './condition.scss';

export class Conditions extends React.Component {

  typeFilter = (types) => types.filter(item => item.type === this.props.parentType);

  handleOnChange = (e) => {
    e.preventDefault();
    const data = this.props.form || [];
    const id = this.props.id;
    const parentId = this.props.parentId;
    const name = e.target.name;
    const value = e.target.value;

    const updateConfig = {
      id,
      parentId,
      name,
      value
    };
    return formUpdate(data, updateConfig);
  };

  render() {
    return (
      <div className="conditions-wrapper">
        <label htmlFor="condition" className="input-label">Condition:
          <select name="condition" className="input select"
            value={ this.props.condition || undefined }
            onChange={ this.handleOnChange }
          >
          
          { 
            this.typeFilter(inputTypes) && this.typeFilter(inputTypes)
              .map(item => {
                return item.type === 'radio' 
                ? ( <option 
                      key="radio"
                    >
                      Equals
                    </option> )
                : !!item.conditions && item.conditions
                  .map(condition => (
                    <option
                      key={ condition }
                    >
                    { condition }
                    </option>));
              })
          }
          </select>
          { this.typeFilter(inputTypes).map(item =>
              item.type === 'radio' 
              ? ( <select key={item.name} name="conditionValue" 
                    value={ this.props.conditionValue } 
                    className="input select" 
                    onChange={ this.handleOnChange }
                  >
                  { 
                    this.typeFilter(inputTypes)
                      .map(item => item.conditions && item.conditions
                        .map((condition, index) => (
                          <option key={ condition + '_' + index }
                          >
                            { condition ? 'Yes' : 'No' }
                          </option>
                        ))
                      )
                  }
                  </select>
                )
              : (<input key={ item.type } 
                  name="conditionValue"
                  type={ item.type } 
                  className="input"
                  defaultValue={ this.props.conditionValue }
                  onChange={ this.handleOnChange }
                />
                )
          )}
        </label>
      </div>    
    )
  };
};

Conditions.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  condition: PropTypes.string,
  conditionValue: PropTypes.string || PropTypes.number,
  form: PropTypes.arrayOf(PropTypes.object),
  parentType: PropTypes.string,
};