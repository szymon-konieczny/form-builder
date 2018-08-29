import * as React from 'react';
import PropTypes from 'prop-types';

export class FormPreviewItem extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    question: PropTypes.string,
    type: PropTypes.string,
    parentCondition: PropTypes.string,
    condition: PropTypes.string,
    inputConditionValueUpdate: PropTypes.func
  };

  onChangeInputConditionValue = (e) => {
    const parentCondition = this.props.parentCondition;
    const condition = this.props.condition;
    const conditionData = parentCondition || condition;
    const conditionValue = e.target.value;
    const id = this.props.id;

    const conditionConfig = {
      id,
      conditionData,
      conditionValue,
      parentCondition
    }
    this.props.inputConditionValueUpdate(conditionConfig);
  };

  render() {
    const { 
      props: {
        id,
        question,
        type
      },
      onChangeInputConditionValue
    } = this;

    return (
      <div className="form-preview-item">
          <h3 className="message">{ question }</h3>
          {
            type === 'radio' 
            ? (
              <React.Fragment>
                  <input type={ type } 
                    name={ id } 
                    id="yes" 
                    value="Yes"
                    onChange={ onChangeInputConditionValue } 
                  />
                  <label htmlFor="yes">Yes</label>
                  <input type={ type } 
                    name={ id }  
                    id="no" 
                    value="No"
                    onChange={ onChangeInputConditionValue }
                  />
                  <label htmlFor="no">No</label>
              </React.Fragment>
            )
            : type
            ? (<input 
                type={ type }
                onChange={ onChangeInputConditionValue } 
              />)
            : false
          }
      </div>
    );
  };
};