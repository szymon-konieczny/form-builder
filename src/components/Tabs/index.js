import * as React from 'react';
import PropTypes from 'prop-types';
import { Tab } from '../Tab/index';

import './tabs.scss';

export class Tabs extends React.Component {

  static propTypes = {
    children: PropTypes.instanceOf(Array).isRequired
  };

  state = {
    activeTab: this.props.children[0].props.label
  };

  onClickTabItem = tab => {
    this.setState({
      activeTab: tab
    });
  };

  render = () => {
    const {
      props: {
        children
      },
      state: {
        activeTab
      },
      onClickTabItem
    } = this;

    return (
      <React.Fragment>
        <ol className="tab-list">
          {
            children.map(child => {
              const { label } = child.props;

              return (
                <Tab
                  activeTab={ activeTab }
                  key={ label }
                  label={ label }
                  onClick={ onClickTabItem }
                />
              );
            })
          }
        </ol>
        <div className="tab-content">
          {
            children.map(child => {
              if (child.props.label !== activeTab) {
                return undefined;
              };
              return child.props.children;
            })
          }
        </div>
      </React.Fragment>
    )
  }
};