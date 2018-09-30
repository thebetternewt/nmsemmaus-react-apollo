import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import { Mutation } from 'react-apollo';

import {
  FormControl,
  InputLabel,
  Input,
  TextField,
  Button,
  CircularProgress
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { REMOVE_NEWSLETTER } from '../../../apollo/mutations';

import 'react-quill/dist/quill.snow.css';

const styles = {
  buttonMargins: {
    margin: '1rem 20px 1rem 0',
  },
};

class NewsletterForm extends Component {
  state = {
    id: this.props.newsletter.id || '',
    title: this.props.newsletter.title || '',
    body: this.props.newsletter.body || '',
    publishedOn: this.props.newsletter.publishedOn || '',
    documentUrl: this.props.newsletter.documentUrl || '',
  };


  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBodyChange = value => {
    this.setState({ body: value });
  };

  setDocumentUrl = url => {
    this.setState({ documentUrl: url });
  };

  render() {
    const { id, title, body, publishedOn, documentUrl } = this.state;
    const { submit, close, error, classes } = this.props;

    return (
      <form
        onSubmit={e => {
          e.preventDefault();
          submit({
            variables: {
              id,
              title,
              body,
              publishedOn,
              documentUrl,
            },
            refetchQueries: ['NewslettersQuery'],
          })
            .then(() => close())
            .catch(err => console.log(err));
        }}
      >
        {error && (
          <pre style={{ margin: '1rem', color: 'red' }}>
            Error:{' '}
            {error.graphQLErrors.map(({ message }, i) => (
              <span key={i}>{message}</span>
            ))}
          </pre>
        )}

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input
            type="text"
            id="title"
            name="title"
            value={title}
            autoFocus
            onChange={this.handleInputChange}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <InputLabel htmlFor="body" shrink>
            Body
          </InputLabel>
          <ReactQuill
            value={body}
            onChange={this.handleBodyChange}
            style={{ marginTop: '2rem' }}
          />
        </FormControl>

        <FormControl margin="normal" required fullWidth>
          <TextField
            type="date"
            id="publishedOn"
            name="publishedOn"
            label="Publication Date"
            value={publishedOn}
            onChange={this.handleInputChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="raised"
          color="primary"
          className={classes.buttonMargins}
        >
          Submit
        </Button>
        <Mutation mutation={REMOVE_NEWSLETTER}>
          {(removeNewsletter, { error, loading }) => {
            if (loading) {
              return <CircularProgress />;
            }

            return (
              <Button
                variant="raised"
                color="secondary"
                onClick={() => {
                  if (window.confirm('Are you sure?')) {
                    removeNewsletter({
                      variables: { id },
                      refetchQueries: ['NewslettersQuery'],
                    })
                      .then(
                        // TODO: Redirect with JS
                        (window.location.href = '/admin/newsletters')
                      )
                      .catch(err => console.log(err));
                  }
                }}
                className={classes.buttonMargins}
              >
                Delete
              </Button>
            );
          }}
        </Mutation>
        <Button
          variant="raised"
          onClick={close}
          className={classes.buttonMargins}
          style={{ backgroundColor: '#777' }}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

NewsletterForm.defaultProps = {
  newsletter: {},
};

NewsletterForm.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  newsletter: PropTypes.shape(),
};

export default withStyles(styles)(NewsletterForm);
