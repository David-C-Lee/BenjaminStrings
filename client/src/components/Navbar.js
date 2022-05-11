import React, { Component } from 'react';
import Link from 'react-router-dom/Link';
// MUI
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <ToolBar className="nav-container">
                    <Button color="inherit" component={Link} to="/">
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/about">
                        About
                    </Button>
                    <Button color="inherit" component={Link} to="/gallery">
                        Gallery
                    </Button>
                    <Button color="inherit" component={Link} to="/login">
                        Sign in
                    </Button>
                    <Button color="inherit" component={Link} to="/signup">
                        Sign in (MM)
                    </Button>
                </ToolBar>
            </AppBar>
        );
    }
}

export default Navbar;