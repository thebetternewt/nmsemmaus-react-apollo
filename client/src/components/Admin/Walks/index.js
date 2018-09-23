import React, { Component, Fragment } from 'react';
import { Button } from '@material-ui/core';

import WalkList from './WalkList';
import AddWalk from './AddWalk';
import EditWalk from './EditWalk';
import Pilgrims from '../Pilgrims';

export default class Walks extends Component {
  state = {
    showAddWalk: false,
    showEditWalk: false,
    selectedWalk: null
  };

  showAddWalk = () => {
    this.setState({ showAddWalk: true, showEditWalk: false });
  };
  hideAddWalk = () => {
    this.setState({ showAddWalk: false });
  };

  showEditWalk = walk => {
    this.setState({
      selectedWalk: walk,
      showEditWalk: true,
      showAddWalk: false
    });
  };

  hideEditWalk = walk => {
    this.setState({
      showEditWalk: false
    });
  };

  render() {
    const { showAddWalk, showEditWalk, selectedWalk } = this.state;

    return (
      <div>
        <h2>Manage Walks</h2>

        {showEditWalk && (
          <Fragment>
            <EditWalk walk={selectedWalk} cancelEdit={this.hideEditWalk} />
            <Pilgrims walkNumber={selectedWalk.walkNumber} />
          </Fragment>
        )}
        {!showAddWalk &&
          !showEditWalk && <WalkList selectWalk={this.showEditWalk} />}
        {showAddWalk && <AddWalk cancelAdd={this.hideAddWalk} />}
        {!showAddWalk &&
          !showEditWalk && (
            <Button variant="raised" color="primary" onClick={this.showAddWalk}>
              Add New Walk
            </Button>
          )}
      </div>
    );
  }
}
