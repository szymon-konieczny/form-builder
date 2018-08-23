import * as React from 'react';
import PropTypes from 'prop-types';

import './tab.scss';

export class Tab extends React.Component {
  static propTypes = {
    activeTab: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  };

  handleOnClick = () => {
    const { label, onClick } = this.props;
    onClick(label);
  };

  render() {
    const {
      props: {
        activeTab,
        label
      },
      handleOnClick
    } = this;

    let className="tab-list-item";
    if (activeTab === label) {
      className += ' tab-list-active';
    };

    return (
      <li 
        className={ className } 
        onClick={ handleOnClick }
      >
        { label }
      </li>
    );
  };
};