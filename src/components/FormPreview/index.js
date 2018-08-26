import * as React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../services/form-creator.service';
import { fetchFromLocalStorage } from '../../services/storage.service';
import { FormPreviewItem } from '../FormPreviewItem/index';
// import { showInput } from '../../services/form-preview.service';
// import './form-preview.scss';

export class FormPreview extends React.Component {

  state = {
    condition: 'Equals',
    conditionValue: undefined
  };

  getConditionValue = () => this.state.condition;
  
  onConditionValueUpdate = conditionValue => this.setState({ conditionValue });

  displayForm = data => {
    const { 
      state: {
        condition,
        conditionValue
      },
      onConditionValueUpdate
    } = this;

    return data.map(element => {
      if (element.subInputs.length > -1) {
        return (
          <div key={ element.id } >
            <FormPreviewItem
              id={ element.id }
              question={ element.question }
              type={ element.type }
              condition={ element.condition }
              inputConditionValueUpdate={ onConditionValueUpdate }
            />
            {
              this.displayForm(element.subInputs
                .filter(item => item.condition === condition && item.conditionValue === conditionValue)
                .map(el => el))
            }
          </div>
        )
      } 
    });
  };

  render(){
    const {
      getCondition,
      displayForm
    } = this;

    const data = fetchFromLocalStorage();

    return (
      <form onChange={ getCondition } >
          {
            data && data.length > 0 
            ? displayForm(data)
            : <h3 className="message">Enjoy creating your form!</h3>
          }
        </form>
    );
  };
};