export const inputTypes = [{
  type: '',
  name: ''
}, {
  type: 'text',
  name: 'Text',
  conditions: ['Equals']
}, {
  type: 'number',
  name: 'Number',
  conditions: ['Greater than', 'Equals', 'Less than']
}, {
  type: 'radio',
  name: 'Yes / No',
  conditions: ['Yes', 'No']
}];