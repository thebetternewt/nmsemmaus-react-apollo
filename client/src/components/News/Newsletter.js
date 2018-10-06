import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Paper, Button } from '@material-ui/core';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const Newsletter = props => {
  const {
    newsletter: { title, body, documentUrl },
  } = props;

  return (
    <div>
      <NewsletterPaper elevation={22} color="primary">
        <h2>{title}.</h2>
        {/* eslint-disable react/no-danger */}
        <div
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
        {/* eslint-enable react/no-danger */}
      </NewsletterPaper>
      {documentUrl && (
        <a href={documentUrl} target="_blank" rel="noopener noreferrer">
          <Button
            variant="raised"
            color="primary"
            style={{ margin: '1rem 0', width: '100%' }}
          >
            Download <CloudDownloadIcon style={{ marginLeft: '10px' }} />
          </Button>
        </a>
      )}
    </div>
  );
};

Newsletter.propTypes = {
  newsletter: PropTypes.shape().isRequired,
};

export default Newsletter;

const NewsletterPaper = styled(Paper)`
  padding: 2rem 30px;
  max-width: 95vw;

  h2 {
    text-align: left;
    font-size: 2rem;
    margin-bottom: 1.5em;
  }

  @media screen and (max-width: 320px) {
    padding: 2rem 15px;
  }
`;
