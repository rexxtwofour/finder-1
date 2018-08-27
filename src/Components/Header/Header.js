import React, {Component} from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
<<<<<<< HEAD
import Drawer from '@material-ui/core/Drawer';
import Aside from '../Aside/Aside';
=======
import axios from 'axios'
>>>>>>> d9a31063c22cb9a75567f824b0bbd6607551fb98

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends Component {
    state = {
    auth: true,
    anchorEl: null,
<<<<<<< HEAD
    left: false,
  };
=======
    login: false,
    user: ''
};

componentDidMount() {
    axios.get('/api/session/user').then(res => {
        console.log('------------ res', res)
        res.data.first_name &&
        this.setState({ user: res.data, login: true })
        })
}
>>>>>>> d9a31063c22cb9a75567f824b0bbd6607551fb98

handleChange = (event, checked) => {
    this.setState({ auth: checked });
};

login = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback?prevPath=${window.location.pathname}`)

    window.location = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`
}

handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
};

handleClose = () => {
    this.setState({ anchorEl: null, user: '', login: false });
    axios.post('/api/session/user').then(res => {
        console.log('------------ res', res)
        window.location = '/'
    })
};

<<<<<<< HEAD
  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
=======
render() {
    console.log('------------ this.state.user', this.state.user)
>>>>>>> d9a31063c22cb9a75567f824b0bbd6607551fb98
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
<<<<<<< HEAD
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
            <MenuIcon/>
            </IconButton>  
                <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.toggleDrawer('left', false)}
                    onKeyDown={this.toggleDrawer('left', false)}
                >
                    <Aside/>
                </div>
                </Drawer>
            
            <Typography variant="title" color="inherit" className={classes.flex}>
              Finder
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
=======
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                    <MenuIcon />
>>>>>>> d9a31063c22cb9a75567f824b0bbd6607551fb98
                </IconButton>
                <Typography variant="title" color="inherit" className={classes.flex}>
                    Finder
                </Typography>
                {auth && (
                <div>
                    <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                    >
                    {this.state.login ?
                        <div>
                            <figure style={{ 
                                margin: 0, 
                                padding: 0, 
                                height: 30, 
                                width: 30 }}>
                                <img style={{ 
                                    borderRadius: "50%", 
                                    width: 30, 
                                    height: 30, 
                                    margin: 0, 
                                    padding: 0 }} 
                                    src={this.state.user.picture} alt="Profile"/>
                            </figure>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                                >
                                <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        :
                        <AccountCircle onClick={this.login} />
                    }
                    </IconButton>
                    
                </div>
                )}
                </Toolbar>
            </AppBar>
        </div>
    );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles)(Header));