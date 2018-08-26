import * as React from 'react';
import PropTypes from 'prop-types';
import { inputTypes } from '../../fixtures/inputTypes';
import { formUpdate } from '../../services/form-creator.service';

import './condition.scss';

export class FormCreatorInputConditions extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    type: PropTypes.string,
    condition: PropTypes.string,
    conditionValue: PropTypes.string || PropTypes.number,
    form: PropTypes.arrayOf(PropTypes.object),
    parentType: PropTypes.string,
  };

  typeFilter = types => types.filter(item => item.type === this.props.parentType);

  handleOnChange = (e) => {
    e.preventDefault();
    const data = this.props.form || [];
    const id = this.props.id;
    const parentId = this.props.parentId;
    const parentType = this.props.parentType;
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
    const { 
      props: {
        parentType,
        condition,
        conditionValue
      },
      typeFilter, 
      handleOnChange 
    } = this;

    return (
      <div className="conditions-wrapper">
        <label htmlFor="condition" className="input-label">Condition:
          <select name="condition" className="input select"
            defaultValue={ condition || 'Equals' }
            onChange={ handleOnChange }
          >
          { 
            typeFilter(inputTypes) && typeFilter(inputTypes)
              .map(item => item.conditions
                .map(condition => (
                  <option
                    key={ condition }
                  >
                  { condition }
                  </option>
                ))
              )
          }
          </select>
          { typeFilter(inputTypes).map(item =>
              item.type === 'radio' 
              ? ( <select key={item.name} name="conditionValue" 
                    defaultValue={ conditionValue } 
                    className="input select" 
                    onChange={ handleOnChange }
                  >
                  { 
                    typeFilter(inputTypes)
                      .map(item => item.values && item.values
                        .map((condition, index) => (
                          <option key={ condition + '_' + index }
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
                  value={ conditionValue || undefined }
                  type={ item.type } 
                  className="input"
                  onChange={ handleOnChange }
                />
                )
          )}
        </label>
      </div>    
    )
  };
};