import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import axios from 'axios';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { SIGN_S3, UPDATE_NEWSLETTER } from '../../../apollo/mutations';

import { Button, LinearProgress } from '@material-ui/core';
import { PURPLE } from '../../UI/colors';

class DocumentUploader extends Component {
  state = {
    file: null,
    percentComplete: 0,
    showProgress: false
  };

  onDrop = async files => {
    this.setState({ file: files[0] });
    this.formatFileName(files[0].name);
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  submit = async (signedRequest, url) => {
    const { file } = this.state;
    this.uploadToS3(file, signedRequest);
  };

  formatFileName = filename => {
    // const dateString = moment().format('YYYYMMDDHHmmss');

    // Split filename on "." to find file extension
    const filenameParts = filename.split('.');
    const fileExt = filenameParts.pop();

    // Clean and construct new pretty filename
    // const cleanFilename = filenameParts
    //   .join('-')
    //   .toLowerCase()
    //   .replace(/[^a-z0-9]/g, '-');
    const newFilename = `${this.props.newsletterId}-newsletter.${fileExt}`;

    return newFilename;
  };

  uploadToS3 = async (file, signedRequest) => {
    this.setState({ showProgress: true });
    const options = {
      headers: {
        'Content-Type': file.type
      },
      onUploadProgress: progressEvent => {
        const { loaded, total } = progressEvent;
        const percentComplete = Math.floor((loaded / total) * 100);

        this.setState({ percentComplete });
      }
    };

    // Post to S3
    await axios.put(signedRequest, file, options);

    this.setState({ showProgress: false });
    this.props.close();
  };

  render() {
    const { file, percentComplete, showProgress } = this.state;
    const { newsletterId } = this.props;

    return (
      <div>
        {showProgress && (
          <Fragment>
            <p style={{ color: PURPLE }}>{percentComplete}%</p>

            <ProgressBar variant="determinate" value={percentComplete} />
          </Fragment>
        )}

        <DocumentDropzone onDrop={this.onDrop} accept=".pdf">
          {file ? (
            <p>
              {file.name} <br />
              <br /> <em>(click to change)</em>
            </p>
          ) : (
            <p>Drop file here, or click to select file to upload.</p>
          )}
        </DocumentDropzone>

        <Mutation mutation={SIGN_S3}>
          {signS3 => (
            <Mutation mutation={UPDATE_NEWSLETTER}>
              {updateNewsletter => {
                return (
                  <Button
                    variant="raised"
                    color="primary"
                    disabled={!file}
                    onClick={async () => {
                      try {
                        const response = await signS3({
                          variables: {
                            filename: this.formatFileName(file.name),
                            filetype: file.type,
                            path: 'newsletters'
                          }
                        });

                        const { signedRequest, url } = response.data.signS3;
                        await this.submit(signedRequest);
                        await updateNewsletter({
                          variables: { id: newsletterId, documentUrl: url },
                          refetchQueries: 'NewslettersQuery'
                        });
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                  >
                    Attach
                  </Button>
                );
              }}
            </Mutation>
          )}
        </Mutation>

        <Button variant="raised" color="secondary" onClick={this.props.close}>
          Cancel
        </Button>
      </div>
    );
  }
}

DocumentUploader.propTypes = {
  newsletterId: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired
};

export default DocumentUploader;

const DocumentDropzone = styled(Dropzone)`
  width: 100%;
  max-width: 300px;
  border: dashed;
  border-radius: 5px;
  border-color: ${PURPLE};
  margin: 1rem 0;
  padding: 10px;
`;

const ProgressBar = styled(LinearProgress)`
  width: 100%;
  max-width: 300px;
`;
