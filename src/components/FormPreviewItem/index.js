import * as React from 'react';
import PropTypes from 'prop-types';

export class FormPreviewItem extends React.Component {

  static propTypes = {
    input: PropTypes.object
  };

  state = {
    elementId: null,
    condition: null,
    conditionValue: null,
    currentConditionValue: null
  };

  onConditionValueUpdate = e => {
    const { input } = this.props
    const condition = input.parentCondition;
    const currentConditionValue = e.target.value;
    const elementId = input.id;
    this.setState({ elementId, condition, currentConditionValue });
  };

  showInput = (input) => {
    const { showInput, filterInputs } = this;

    return (
      <div className="form-preview-item" key={ `_${input && input.question}` } >
        <h3 className="message">{ input && input.question }</h3>
        {
          input && input.type === 'radio' 
          ? (
            <div>
              <input type={input && input.type } 
                name={ input && input.id } 
                id="yes" 
                value="Yes"
                onChange={ this.onConditionValueUpdate } 
              />
              <label htmlFor="yes">Yes</label>
              <input type={ input && input.type } 
                name={ input && input.id }  
                id="no" 
                value="No"
                onChange={ this.onConditionValueUpdate }
              />
              <label htmlFor="no">No</label>
            </div>
          )
          : input && input.type
          ? (<input 
              type={ input.type }
              onChange={ this.onConditionValueUpdate } 
            />)
          : false
        }
        { input && input.subInputs
        ? input.subInputs.map(input => {
          return (
            <div key={ `__${input && input.id}` }>
              { showInput(filterInputs(input)) }
            </div>
          )})
        : false 
        }
      </div>
    );
  };

  filterInputs = input => {
    const { 
      state: { currentConditionValue }
    } = this;
    
    if (input.parentId) {
      if (input.parentType === 'number') {
        switch (input.condition) {
          case 'Greater than':
            if (currentConditionValue && currentConditionValue * 1 > input.conditionValue * 1) {
              return input;
            }
            break;
          case 'Equals':
            if (currentConditionValue && currentConditionValue * 1 === input.conditionValue * 1) {
              return input;
            }
            break;
          case 'Less than':
            if (currentConditionValue && currentConditionValue * 1 < input.conditionValue * 1) {
              return input;
            }
            break;
        }
      }
      if (currentConditionValue === input.conditionValue) {
        return input;
      };
    };
  };

  render() {
    const { 
      props: {
        input
      },
      showInput
    } = this;

    return (
      <div className="preview-wrapper">
        {
          showInput(input)
        }
      </div>
    );
  };
};