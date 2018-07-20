import * as React from 'react';
import uuid from 'uuid';
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

  render() {
    const { types } = this.props;
    return (
      <form className="form-wrapper" >
        { this.props.form.length > 0 
          ? this.props.form.map(item => (
              <Input key={ item.id }
                id={ item.id } 
                question={ item.question || '' } 
                types={ types }
                handleDelete={ this.deleteItem }
              />
            ))
          : <h4 className="form-header">Enjoy creating your form!</h4>
       }
       <button className="btn" onClick={ this.addInput }>Add Input</button>
      </form>
    )
  };
};

Form.propTypes = {
  form: PropTypes.array,
  types: PropTypes.array,
  update: PropTypes.func,
  delete: PropTypes.func
};