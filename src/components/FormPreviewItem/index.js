import * as React from 'react';
import PropTypes from 'prop-types';

export class FormPreviewItem extends React.Component {

  static propTypes = {
    question: PropTypes.string,
    type: PropTypes.string,
    condition: PropTypes.string,
    inputConditionValueUpdate: PropTypes.func,
  };

  onChangeInputConditionValue = (e) => {
    const inputConditionValue = e.target.value;
    this.props.inputConditionValueUpdate(inputConditionValue);
  };

  render() {
    const { 
      props: {
        id,
        question,
        type,
        condition
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
                condition={ condition }
                onChange={ onChangeInputConditionValue } 
              />)
            : false
          }
      </div>
    );
  };
};