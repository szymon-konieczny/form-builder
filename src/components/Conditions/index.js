import * as React from 'react';
import PropTypes from 'prop-types';
import inputTypes from '../../fixtures/inputTypes';
import './condition.scss';

export default class Conditions extends React.Component {

  conditionSelect = () => {
    console.log('Conditions component here!');
  };

  state = {
    parentType: null
  };

  componentDidMount = () => this.setState({ parentType: this.props.type || 'number' });

  typeFilter = (types) => types.filter(item => item.type === this.state.parentType);

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

  render() {
    return (
      <div className="conditions-wrapper">
        <label htmlFor="condition" className="input-label">Condition:
          <select name="condition" className="input select">
          {
            this.typeFilter(inputTypes)
              .map(item => {
                return item.type === 'radio' 
                ? ( <option 
                      key="radio"
                      defaultValue={ item.type }
                    >
                      Equals
                    </option> )
                : item.conditions
                  .map(condition => (
                    <option 
                      key={ condition }
                    >
                    { condition }
                    </option>))
              })
          }
          </select>
          { this.typeFilter(inputTypes).map(item =>
              item.type === 'radio' 
              ? ( <select key={item.name} name="conditionValue" className="input select">
                  { 
                    this.typeFilter(inputTypes)
                      .map(item => item.conditions
                        .map((condition, index) => (
                          <option key={ condition + '_' + index } 
                            defaultValue={ condition }
                          >
                            { condition }
                          </option>
                        ))
                      )
                  }
                  </select>
                )
              : (<input key={ item.type } 
                  type={ item.type } 
                  className="input"
                  name="conditionValue" 
                  defaultValue="123"
                />
                )
          )}
        </label>
      </div>    
    )
  };
};