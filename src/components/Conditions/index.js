import * as React from 'react';
import PropTypes from 'prop-types';
import inputTypes from '../../fixtures/inputTypes';
import './condition.scss';

export default class Conditions extends React.Component {

  typeFilter = (types) => types.filter(item => item.type === this.props.parentType);

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
    this.props.handleUpdate(data, updateConfig);
  };

  render() {
    return (
      <div className="conditions-wrapper">
        <label htmlFor="condition" className="input-label">Condition:
          <select name="condition" className="input select" onChange={ this.handleOnChange }>
          {
            this.typeFilter(inputTypes) && this.typeFilter(inputTypes)
              .map(item => {
                return item.type === 'radio' 
                ? ( <option 
                      key="radio"
                      defaultValue={ item.type }
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
                    className="input select" 
                    onChange={ this.handleOnChange }
                  >
                  { 
                    this.typeFilter(inputTypes)
                      .map(item => item.conditions && item.conditions
                        .map((condition, index) => (
                          <option key={ condition + '_' + index } 
                            defaultValue={ this.props.conditionValue }
                          >
                            { condition }
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
                  name="conditionValue" 
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
  form: PropTypes.arrayOf(PropTypes.object),
  type: PropTypes.string,
  handleUpdate: PropTypes.func,
  conditionValue: PropTypes.string
};