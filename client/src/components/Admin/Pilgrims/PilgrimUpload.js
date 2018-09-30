import React, { Component } from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import Papa from 'papaparse';

import { Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import { ADD_PILGRIM } from '../../../apollo/mutations';

import { PURPLE } from '../../UI/colors';

export default class PilgrimUpload extends Component {
  state = {
    file: null,
    pilgrims: null,
    error: null,
    showSuccess: false,
  };

  onDrop = async files => {
    const pilgrimsCsv = files[0];

    // Reset success & error to null and add file
    this.setState({ file: pilgrimsCsv, error: null, showSuccess: false });

    console.log('[file]:', pilgrimsCsv);

    // Parse CSV
    await Papa.parse(pilgrimsCsv, {
      header: true,
      delimiter: ',',
      complete: result => {
        console.log('[parsedResult]:', result);

        // Check for errors in csv
        const pilgrimData = result.data;
        const requiredFields = ['firstName', 'lastName', 'walkNumber'];

        pilgrimData.forEach(pilgrim => {
          // Convert pilgrim object to string
          let pilgrimString = '';
          requiredFields.forEach(field => {
            pilgrimString = `${pilgrimString}${field}: ${pilgrim[field]}, `;
          });

          // Define error messages
          if (pilgrim.firstName.length === 0) {
            this.setState({
              error: `First Name required for ${pilgrimString}`,
            });
          }
          if (pilgrim.lastName.length === 0) {
            this.setState({
              error: `First Name required for ${pilgrimString}`,
            });
          }
          if (pilgrim.walkNumber.length === 0) {
            this.setState({
              error: `First Name required for ${pilgrimString}`,
            });
          }
        });

        this.setState({ pilgrims: result.data });
      },
    });
  };

  render() {
    const { file, pilgrims, error, showSuccess } = this.state;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <h3>Add Pilgrims</h3>
        {error && <ErrorMessage>Error: {error}</ErrorMessage>}
        {showSuccess && (
          <SuccessMessage>
            {pilgrims.length} pilgrims have been uploaded!
          </SuccessMessage>
        )}
        <Mutation mutation={ADD_PILGRIM}>
          {(addPilgrim, { loading, error: uploadError }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (uploadError) {
              console.log(uploadError);
            }

            return (
              <div>
                <PilgrimDropzone onDrop={this.onDrop} accept=".csv">
                  {file ? (
                    <p>
                      {file.name} <br />
                      <br /> <em>(click to change)</em>
                    </p>
                  ) : (
                    <p>Drop file here, or click to select file to upload.</p>
                  )}
                </PilgrimDropzone>
                <Button
                  variant="raised"
                  color="primary"
                  disabled={!!error || !file}
                  onClick={() => {
                    console.log('[pilgrims]:', pilgrims);
                    pilgrims.forEach(async pilgrim => {
                      await addPilgrim({
                        variables: { ...pilgrim },
                        refetchQueries: ['WalksQuery'],
                      });

                      // Reset state
                      this.setState({ file: null, showSuccess: true });
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

const PilgrimDropzone = styled(Dropzone)`
  width: 100%;
  max-width: 300px;
  border: dashed;
  border-radius: 5px;
  border-color: ${PURPLE};
  margin: 1rem 0;
  padding: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
`;
const SuccessMessage = styled.p`
  color: green;
`;
