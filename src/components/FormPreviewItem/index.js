import * as React from 'react';
import PropTypes from 'prop-types';
import { getIndentationValueInPx } from '../../services/styles.service'; 

export class FormPreviewItem extends React.Component {

  static propTypes = {
    input: PropTypes.object.isRequired
  };

  state = {
    value: null
  };

  style = {
    marginLeft: getIndentationValueInPx(20, this.props.input.levelNo)
  };

  onValueUpdate = e => {
    this.setState({ value: e.target.value });
  };

  showRadioInput = input => (
    <div>
      <input type={ input.type } 
        name={ input.id } 
        id="yes" 
        value="Yes"
        onChange={ this.onValueUpdate } 
      />
      <label htmlFor="yes">Yes</label>
      <input type={ input.type } 
        name={ input.id }  
        id="no" 
        value="No" 
        onChange={ this.onValueUpdate }
      />
      <label htmlFor="no">No</label>
    </div>
  );

  showNumberOrTextInput = input => (<input type={ input.type } onChange={ this.onValueUpdate }/>);

  showSubinputs = subInputs => {
    const { isSubInputValid, showInput } = this;
    const filteredInputs = subInputs.filter(isSubInputValid);
    return filteredInputs.map(showInput);
  };

  isSubInputValid = subInput => {
    const currentValue = this.state.value;

    if (subInput.parentType === 'number') {
      switch (subInput.condition) {
        case 'Greater than':
          return currentValue && currentValue * 1 > subInput.conditionValue * 1;
        case 'Equals':
          return currentValue && currentValue * 1 === subInput.conditionValue * 1;
        case 'Less than':
          return currentValue && currentValue * 1 < subInput.conditionValue * 1;
      }
    } else {
      return currentValue && currentValue === subInput.conditionValue;
    };
  };

  showInput = input => (
    <div className="form-preview-item" key={ `_${input.question}` } >
      <h3 className="message">{ input.question }</h3>
      {
        input.type === 'radio' ? this.showRadioInput(input) : input.type ? this.showNumberOrTextInput(input) : false
      }
      {
        this.showSubinputs(input.subInputs)
      }
    </div>
  );

  render = () => {
    const { props: { input }, style, showInput } = this;

    return (
      <div className="preview-wrapper" style={ style }>
        {
          showInput(input)
        }
      </div>
    );
  };
};