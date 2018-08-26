export const inputTypes = [{
  type: '',
  name: ''
}, {
  type: 'text',
  name: 'Text',
  conditions: ['Select condition', 'Equals']
}, {
  type: 'number',
  name: 'Number',
  conditions: ['Select condition', 'Greater than', 'Equals', 'Less than']
}, {
  type: 'radio',
  name: 'Yes / No',
  conditions: ['Select condition', 'Equals'],
  values: ['Select Yes or No', 'Yes', 'No']
}];