import * as React from 'react';
import PropTypes from 'prop-types';
import Input from '../Input/index';
import './form.scss';

export default class Form extends React.Component {

  deleteItem = (e) => {
    e.preventDefault();
    const id = e.target.dataset.id;
    this.props.delete(id);
  };

  addInput = (e) => {
    e.preventDefault();
    this.props.update();
  };

  onUpdate = () => {
    // this.props.update();
    console.log('Data has been updated!');
  };

  render() {
    const { types, form } = this.props;
    return (
      <form className="form-wrapper" >
        { form.length > 0 
          ? form.map(item => (
              <Input 
                form={ form }
                key={ item.id }
                id={ item.id } 
                question={ item.question || '' } 
                types={ types }
                handleDelete={ this.deleteItem }
                handleChange={ this.onUpdate }
              />
            ))
          : <h4 className="form-header">Enjoy creating your form!</h4>
       }
       <button className="btn" onClick={ this.addInput }>Add Input</button>
      </form>
    );
  };
};

Form.propTypes = {
  form: PropTypes.arrayOf(PropTypes.object),
  types: PropTypes.arrayOf(PropTypes.object),
  update: PropTypes.func,
  delete: PropTypes.func
};