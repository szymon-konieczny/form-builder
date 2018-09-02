import * as React from 'react';
import PropTypes from 'prop-types';
import './form-preview-item.scss';

export class FormPreviewItem extends React.Component {

  static propTypes = {
    input: PropTypes.object.isRequired
  };

  state = {
    value: null
  };

  onValueUpdate = e => {
    this.setState({ value: e.target.value });
  };

  showRadioInput = input => (
    <div className="input-wrapper">
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

  showNumberOrTextInput = input => (
    <div>
      <input className="input" type={ input.type } onChange={ this.onValueUpdate }/>
    </div>
  );

  showSubinputs = subInputs => {
    const { isSubInputValid } = this;
    const filteredInputs = subInputs.filter(isSubInputValid);
    return filteredInputs.map((input, idx) => (
      <div key={ `${input.id + '-' + idx}` }>
        <FormPreviewItem input={ input } />
      </div>
    ));
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
    <div className="form-preview-item" key={ `_${input.question}` }>
      <h4 className="message">{ input.question }</h4>
      {
        input.type === 'radio' ? this.showRadioInput(input) : input.type ? this.showNumberOrTextInput(input) : false
      }
      {
        this.showSubinputs(input.subInputs)
      }
    </div>
  );

  render = () => {
    const { props: { input }, showInput } = this;
    return showInput(input);
  };
};