import * as React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../services/form-creator.service';
import { fetchFromLocalStorage } from '../../services/storage.service';
import { FormPreviewItem } from '../FormPreviewItem/index';
// import { showInput } from '../../services/form-preview.service';
// import './form-preview.scss';

export class FormPreview extends React.Component {

  state = {
    condition: null,
    conditionValue: null
  };

  onConditionValueUpdate = (condition, conditionValue) => {
    console.log(condition);
    this.setState({ condition, conditionValue });
  };

  displayForm = data => {
    const { 
      state: {
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
              parentCondition={ element.parentCondition }
              condition={ element.condition }
              inputConditionValueUpdate={ onConditionValueUpdate }
            />
            {
              this.displayForm(element.subInputs
                .filter(item => {
                  if (item.parentType === 'number') {
                    switch (item.condition) {
                      case 'Greater than':
                        return conditionValue && conditionValue *1 > item.conditionValue * 1;
                      case 'Equals':
                        return conditionValue && conditionValue * 1 === item.conditionValue * 1;
                      case 'Less than':
                        return conditionValue && conditionValue * 1 < item.conditionValue * 1;
                    }
                  }
                  return conditionValue && conditionValue === item.conditionValue;
                })
                .map(el => el)
              )
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