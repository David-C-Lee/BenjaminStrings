import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// MUI
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/styles';

const styles = {};

class gallery extends Component {
    render() {
        const {
            classes,
            user: {
                // credentials: { handle, createdAt, imageUrl, bio, website, location },
                loading,
                authenticated
            }
        } = this.props;

        let profileMarkup = !loading ? (
            authenticated ? (
            <Paper className={classes.paper}>
                <div>
                    <h1>Gallery</h1>
                    <img src="https://images.unsplash.com/photo-1492563817904-5f1dc687974f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHZpb2xpbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"></img>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body 2" align="center">
                    Please sign in, in order to view the gallery:
                </Typography>
                <div>&nbsp;</div>
                <div className={classes.buttons}>
                    <Button variant="contained" color="primary" component={Link} to="/login">
                        Sign in
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="primary" component={Link} to="/signup">
                        Sign in (MetaMask)
                    </Button>
                </div>
            </Paper>
        )) : (<p>loading...</p>)

        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

gallery.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
}

export default connect(mapStateToProps)(withStyles(styles)(gallery));