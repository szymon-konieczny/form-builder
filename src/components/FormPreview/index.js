import * as React from 'react';
import PropTypes from 'prop-types';
import { fetchFromLocalStorage } from '../../services/storage.service';
import { FormPreviewItem } from '../FormPreviewItem/index';

export class FormPreview extends React.Component {

  static propTypes = {
    conditionValue: PropTypes.string
  };

  state = {
    elementId: null,
    condition: null,
    conditionValue: null
  };

  onConditionValueUpdate = conditionConfig => {
    const { id, condition, conditionValue } = conditionConfig;
    const elementId = id;
    this.setState({ elementId, condition, conditionValue });
  };

  displayForm = data => {
    const { 
      state: {
        conditionValue
      },
      onConditionValueUpdate
    } = this;

    return data.map(element => {

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
                        return conditionValue && conditionValue * 1 > item.conditionValue * 1;
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
    });
  };

  render(){
    const {
      displayForm
    } = this;

    const data = fetchFromLocalStorage();

    return (
      <form>
        {
          data && data.length > 0
          ? displayForm(data)
          : <h3 className="message">Enjoy creating your form!</h3>
        }
      </form>
    );
  };
};