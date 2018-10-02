import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query, Mutation } from 'react-apollo';
import { Paper, CircularProgress, Button } from '@material-ui/core';
import { NEWSLETTER_QUERY } from '../../../apollo/queries';
import { UPDATE_NEWSLETTER } from '../../../apollo/mutations';

import NewsletterForm from './NewsletterForm';
import DocumentUploader from './DocumentUploader';

export default class Newsletter extends Component {
  state = {
    id: this.props.id, // eslint-disable-line react/destructuring-assignment
    showEditMode: false,
    showDocumentUpload: false,
  };

  toggleEditMode = () => {
    const { showEditMode } = this.state;
    this.setState({ showEditMode: !showEditMode });
  };

  toggleDocumentUpload = () => {
    const { showDocumentUpload } = this.state;
    this.setState({ showDocumentUpload: !showDocumentUpload });
  };

  render() {
    const { cancelEdit } = this.props;
    const { id, showEditMode, showDocumentUpload } = this.state;

    return (
      <Paper elevation={12} style={{ padding: '1rem', margin: '2rem 0' }}>
        <Query query={NEWSLETTER_QUERY} variables={{ id }}>
          {({ data, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            if (data && data.newsletter) {
              const { title, publishedOn, documentUrl } = data.newsletter;

              if (showEditMode) {
                return (
                  <Mutation mutation={UPDATE_NEWSLETTER}>
                    {(updateNewsletter, { loading: updating, error }) => {
                      if (updating) {
                        return <CircularProgress />;
                      }

                      return (
                        <NewsletterForm
                          submit={updateNewsletter}
                          error={error}
                          close={this.toggleEditMode}
                          newsletter={data.newsletter}
                        />
                      );
                    }}
                  </Mutation>
                );
              }
              return (
                <Fragment>
                  <h3>Detail:</h3>
                  <p>
                    <strong>Title:</strong> {title}
                  </p>
                  <p>
                    <strong>Body:</strong> (click &ldquo;Edit&rdquo; to see body
                    content)
                  </p>
                  <p>
                    <strong>Publication Date:</strong> {publishedOn}
                  </p>
                  <p>
                    <strong>Document:</strong>{' '}
                    {documentUrl ? (
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'blue', textDecoration: 'underline' }}
                      >
                        Click to view
                      </a>
                    ) : (
                      'None'
                    )}
                    {!showDocumentUpload && (
                      <Button
                        variant="raised"
                        style={{ marginLeft: '1rem' }}
                        onClick={this.toggleDocumentUpload}
                      >
                        {documentUrl ? 'Change' : 'Upload document'}
                      </Button>
                    )}
                  </p>

                  {showDocumentUpload ? (
                    <DocumentUploader
                      newsletterId={id}
                      close={this.toggleDocumentUpload}
                    />
                  ) : (
                    <Fragment>
                      <Button
                        variant="raised"
                        color="primary"
                        onClick={this.toggleEditMode}
                      >
                        Edit Details
                      </Button>
                      <Button
                        variant="raised"
                        color="secondary"
                        onClick={cancelEdit}
                      >
                        Close
                      </Button>
                    </Fragment>
                  )}
                </Fragment>
              );
            }

            return <p>Newsletter not found.</p>;
          }}
        </Query>
      </Paper>
    );
  }
}

Newsletter.propTypes = {
  id: PropTypes.string.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};
