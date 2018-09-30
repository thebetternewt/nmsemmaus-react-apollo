import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import NewsletterList from './NewsletterList';
import AddNewsletter from './AddNewsletter';
import EditNewsletter from './EditNewsletter';

class Newsletters extends Component {
  state = {
    showAddNewsletter: false,
    showEditNewsletter: false,
    selectedNewsletterId: null,
  };

  showAddNewsletter = () => {
    this.setState({ showAddNewsletter: true, showEditNewsletter: false });
  };

  hideAddNewsletter = () => {
    this.setState({ showAddNewsletter: false });
  };

  showEditNewsletter = id => {
    this.setState({
      selectedNewsletterId: id,
      showEditNewsletter: true,
      showAddNewsletter: false,
    });
  };

  hideEditNewsletter = () => {
    this.setState({
      showEditNewsletter: false,
    });
  };

  render() {
    console.log(this.state);
    const {
      showAddNewsletter,
      showEditNewsletter,
      selectedNewsletterId,
    } = this.state;

    return (
      <div>
        <h2>Manage Newsletters</h2>

        {showEditNewsletter && (
          <EditNewsletter
            id={selectedNewsletterId}
            cancelEdit={this.hideEditNewsletter}
          />
        )}
        {!showAddNewsletter &&
          !showEditNewsletter && (
            <NewsletterList selectNewsletter={this.showEditNewsletter} />
          )}
        {showAddNewsletter && (
          <AddNewsletter cancelAdd={this.hideAddNewsletter} />
        )}
        {!showAddNewsletter &&
          !showEditNewsletter && (
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
