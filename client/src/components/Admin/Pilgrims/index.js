import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

import PilgrimList from './PilgrimList';
import AddPilgrim from './AddPilgrim';
import Pilgrim from './Pilgrim';

class Pilgrims extends Component {
  state = {
    showAddPilgrim: false,
    showPilgrim: false,
    selectedPilgrimId: null,
  };

  showAddPilgrim = () => {
    this.setState({ showAddPilgrim: true, showPilgrim: false });
  };

  hideAddPilgrim = () => {
    this.setState({ showAddPilgrim: false });
  };

  showPilgrim = id => {
    this.setState({
      selectedPilgrimId: id,
      showPilgrim: true,
      showAddPilgrim: false,
    });
  };

  hidePilgrim = () => {
    this.setState({
      showPilgrim: false,
    });
  };

  render() {
    const { walkNumber } = this.props;
    const { showAddPilgrim, showPilgrim, selectedPilgrimId } = this.state;

    return (
      <div>
        <h2>Manage Pilgrims</h2>

        {showPilgrim && (
          <Pilgrim id={selectedPilgrimId} cancelEdit={this.hidePilgrim} />
        )}
        {!(showAddPilgrim || showPilgrim) && (
          <PilgrimList
            walkNumber={walkNumber}
            selectPilgrim={this.showPilgrim}
          />
        )}
        {showAddPilgrim && (
          <AddPilgrim cancelAdd={this.hideAddPilgrim} walkNumber={walkNumber} />
        )}
        {!(showAddPilgrim || showPilgrim) && (
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
  walkNumber: null,
};

Pilgrims.propTypes = {
  walkNumber: PropTypes.number,
};

export default Pilgrims;
