import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import NewsletterList from './NewsletterList';
import AddNewsletter from './AddNewsletter';
import Newsletter from './Newsletter';

class Newsletters extends Component {
  state = {
    showAddNewsletter: false,
    showNewsletter: false,
    selectedNewsletterId: null,
  };

  showAddNewsletter = () => {
    this.setState({ showAddNewsletter: true, showNewsletter: false });
  };

  hideAddNewsletter = () => {
    this.setState({ showAddNewsletter: false });
  };

  showNewsletter = id => {
    this.setState({
      selectedNewsletterId: id,
      showNewsletter: true,
      showAddNewsletter: false,
    });
  };

  hideNewsletter = () => {
    this.setState({
      showNewsletter: false,
    });
  };

  render() {
    const {
      showAddNewsletter,
      showNewsletter,
      selectedNewsletterId,
    } = this.state;

    return (
      <div>
        <h2>Manage Newsletters</h2>

        {showNewsletter && (
          <Newsletter
            id={selectedNewsletterId}
            cancelEdit={this.hideNewsletter}
          />
        )}
        {!(showAddNewsletter || showNewsletter) && (
          <NewsletterList selectNewsletter={this.showNewsletter} />
        )}
        {showAddNewsletter && (
          <AddNewsletter cancelAdd={this.hideAddNewsletter} />
        )}
        {!(showAddNewsletter || showNewsletter) && (
          <Button
            variant="raised"
            color="primary"
            onClick={this.showAddNewsletter}
          >
            Add New Newsletter
          </Button>
        )}
      </div>
    );
  }
}

export default Newsletters;
