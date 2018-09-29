import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';

import { Mutation } from 'react-apollo';
import { ADD_PILGRIM } from '../../../apollo/mutations';

import { Paper, CircularProgress, Button } from '@material-ui/core';

export default class AddPilgrim extends Component {
  state = {
    file: null,
    pilgrims: null
  };

  onDrop = async files => {
    const pilgrimsCsv = files[0];
    this.setState({ file: pilgrimsCsv });
    console.log('[file]:', pilgrimsCsv);
    await Papa.parse(pilgrimsCsv, {
      header: true,
      complete: result => {
        console.log('[parsedResult]:', result);
        this.setState({ pilgrims: result.data });
        console.log('[pilgrimsFromState]:', this.state.pilgrims);
      }
    });
  };

  render() {
    const { cancelAdd, walkNumber } = this.props;
    const { pilgrims } = this.state;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add Pilgrims</h3>
        <Mutation mutation={ADD_PILGRIM}>
          {(addPilgrim, { data, loading, error }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (error) {
              console.log(error);
            }

            return (
              <div>
                <Dropzone onDrop={this.onDrop} accept=".csv" />
                <Button
                  variant="raised"
                  color="primary"
                  onClick={() => {
                    console.log('[pilgrims]:', pilgrims);
                    pilgrims.forEach(async pilgrim => {
                      await addPilgrim({ variables: { ...pilgrim } });
                    });
                  }}
                >
                  Upload
                </Button>
              </div>
            );
          }}
        </Mutation>
      </Paper>
    );
  }
}
