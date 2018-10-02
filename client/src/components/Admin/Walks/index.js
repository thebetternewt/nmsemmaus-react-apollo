import React, { Component, Fragment } from 'react';
import { Button } from '@material-ui/core';

import WalkList from './WalkList';
import AddWalk from './AddWalk';
import Walk from './Walk';
import Pilgrims from '../Pilgrims';

export default class Walks extends Component {
  state = {
    showAddWalk: false,
    showWalk: false,
    selectedWalkNumber: null,
  };

  showAddWalk = () => {
    this.setState({ showAddWalk: true, showWalk: false });
  };

  hideAddWalk = () => {
    this.setState({ showAddWalk: false });
  };

  showWalk = walkNumber => {
    this.setState({
      selectedWalkNumber: walkNumber,
      showWalk: true,
      showAddWalk: false,
    });
  };

  hideWalk = () => {
    this.setState({
      showWalk: false,
    });
  };

  render() {
    const { showAddWalk, showWalk, selectedWalkNumber } = this.state;

    return (
      <div>
        <h2>Manage Walks</h2>

        {showWalk && (
          <Fragment>
            <Walk walkNumber={selectedWalkNumber} cancelEdit={this.hideWalk} />
            <Pilgrims walkNumber={selectedWalkNumber} />
          </Fragment>
        )}
        {!showAddWalk && !showWalk && <WalkList selectWalk={this.showWalk} />}
        {showAddWalk && <AddWalk cancelAdd={this.hideAddWalk} />}
        {!(showAddWalk || showWalk) && (
          <Button variant="raised" color="primary" onClick={this.showAddWalk}>
            Add New Walk
          </Button>
        )}
      </div>
    );
  }
}
