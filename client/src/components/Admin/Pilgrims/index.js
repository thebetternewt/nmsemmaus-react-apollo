import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { CircularProgress, Button } from '@material-ui/core';

import PilgrimList from './PilgrimList';
import AddPilgrim from './AddPilgrim';
import EditPilgrim from './EditPilgrim';

class Pilgrims extends Component {
  state = {
    showAddPilgrim: false,
    showEditPilgrim: false,
    selectedPilgrim: null
  };

  showAddPilgrim = () => {
    this.setState({ showAddPilgrim: true, showEditPilgrim: false });
  };
  hideAddPilgrim = () => {
    this.setState({ showAddPilgrim: false });
  };

  showEditPilgrim = pilgrim => {
    this.setState({
      selectedPilgrim: pilgrim,
      showEditPilgrim: true,
      showAddPilgrim: false
    });
  };

  hideEditPilgrim = () => {
    this.setState({
      showEditPilgrim: false
    });
  };

  render() {
    const { walkNumber } = this.props;
    const { showAddPilgrim, showEditPilgrim, selectedPilgrim } = this.state;

    return (
      <div>
        <h2>Manage Pilgrims</h2>

        {showEditPilgrim && (
          <EditPilgrim
            pilgrim={selectedPilgrim}
            cancelEdit={this.hideEditPilgrim}
          />
        )}
        {!showAddPilgrim &&
          !showEditPilgrim && (
            <PilgrimList
              walkNumber={walkNumber}
              selectPilgrim={this.showEditPilgrim}
            />
          )}
        {showAddPilgrim && (
          <AddPilgrim cancelAdd={this.hideAddPilgrim} walkNumber={walkNumber} />
        )}
        {!showAddPilgrim &&
          !showEditPilgrim && (
            <Button
              variant="raised"
              color="primary"
              onClick={this.showAddPilgrim}
            >
              Add New Pilgrim
            </Button>
          )}
      </div>
    );
  }
}

Pilgrims.defaultProps = {
  walkNumber: null
};

Pilgrims.propTypes = {
  walkNumber: PropTypes.number
};

export default Pilgrims;
