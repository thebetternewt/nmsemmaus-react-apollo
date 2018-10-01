import React, { Component } from 'react';
import { Button } from '@material-ui/core';

import BoardList from './BoardList';
import AddBoard from './AddBoard';
import Board from './Board';

class Boards extends Component {
  state = {
    showAddBoard: false,
    showBoard: false,
    selectedBoardYear: null,
  };

  showAddBoard = () => {
    this.setState({ showAddBoard: true, showBoard: false });
  };

  hideAddBoard = () => {
    this.setState({ showAddBoard: false });
  };

  showBoard = year => {
    this.setState({
      selectedBoardYear: year,
      showBoard: true,
      showAddBoard: false,
    });
  };

  hideBoard = () => {
    this.setState({
      showBoard: false,
    });
  };

  render() {
    console.log(this.state);
    const { showAddBoard, showBoard, selectedBoardYear } = this.state;

    return (
      <div>
        <h2>Manage Boards</h2>

        {showBoard && (
          <Board year={selectedBoardYear} cancelEdit={this.hideBoard} />
        )}
        {!showAddBoard &&
          !showBoard && <BoardList selectBoard={this.showBoard} />}
        {showAddBoard && <AddBoard cancelAdd={this.hideAddBoard} />}
        {!(showAddBoard || showBoard) && (
          <Button variant="raised" color="primary" onClick={this.showAddBoard}>
            Add New Board
          </Button>
        )}
      </div>
    );
  }
}

export default Boards;
