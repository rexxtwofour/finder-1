import React, {Component} from 'react';
import { withRouter } from 'react-router';
import ContextProvider, { AppContext } from '../../ContextAPI/ContextProvider'
import { withContext } from '../../ContextAPI/Context_HOC'
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
import Drawer from '@material-ui/core/Drawer';
import Aside from '../Aside/Aside';
import axios from 'axios';
import './Header.css';
import logo from '../../Assets/finder.png';
import { Link } from 'react-router-dom';



const styles = {
 
    root: {
        background: '#1F2D44',
        width:'100vw',
        position:'fixed',
        top:0,
        display:'flex',
        justifyContent:"space-evenly",
        flexDirection: "column",
        flexGrow: 1
        
    },
    flex: {
        fontFamily: 'Baloo Bhai, arial',
        color: '#5ACCC1',
        flexGrow: 1,
        fontSize: '2.5rem',
        textShadow: '1.5px 1.5px 0px #3fa5b5',
    },
    menuButton: {
        color: '#5ACCC1',
        position:'fixed',
        left: '20px'
    },
    AccountCircle: {
        color: '#5ACCC1',
        fontSize: 30,
        position:'fixed',
        right: 30
    },
    ToolBar: {
        color: '#5ACCC1',
        background: '#1F2D44',
    },
    logo: {
        width: 500,
        margin:'0 auto'
    }

};

class Header extends Component {
    state = {
        auth: true,
        anchorEl: null,
        left: false,
    };

    componentDidMount() {
        this.props.context.methods.checkForLogin() 
    }
    handleMenu = event => {
            this.setState({ anchorEl: event.currentTarget });
    };

    handleChange = (event, checked) => {
        this.setState({ auth: checked });
    };

    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };


    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    componentDidUpdate(prevProps) {
        if(this.props.context.user.picture !== prevProps.context.user.picture) {
            this.props.context.methods.checkForLogin()
        }
    }

    render() {
        // console.log('------------ this.props', this.props)
        const { classes, context } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.wrapper}>
                <AppBar className={classes.root} position="static">
                    <Toolbar >
                        <div onClick={this.toggleDrawer('left', true)} className="menu-icon">
                    <IconButton  color="inherit" aria-label="Menu" onClick={this.toggleDrawer('left', true)}>
                        <MenuIcon style={{ fontSize: 30, position:'fixed',top:15, left: 50,color:'#5ACCC1'}} />
                    </IconButton>
                    </div>
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
                    <Link to='/'>
                      <figure style={{ 
                                    margin: 0, 
                                    padding: 0, 
                                    height: 45, 
                                    position: 'fixed',
                                    top:3,
                                    left:100,
                                    overflow: 'hidden'
                                     }}>
                     <img src={logo} alt="finder logo" style={{ 
                                        display: 'inline',
                                        height: '100%',
                                        width: 'auto', 
                                        margin: 0, 
                                        padding: 0 }}  className={classes.logo} />
                    </figure>
                    </Link>
                    {auth && (
                    <div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            color="inherit"
                            
                        >
                        {context.login ?
                            <div>
                                <figure style={{ 
                                    margin: 0, 
                                    padding: 0, 
                                    height: 33, 
                                    width: 33,
                                    position: 'fixed',
                                    top:'12px',
                                    right: '30px',
                                    overflow: 'hidden',
                                    borderRadius: '50%' }}
                                    onClick={this.handleMenu}
                                    >
                                    <img style={{ 
                                        display: 'inline',
                                        height: '100%',
                                        width: 'auto', 
                                        margin: 0, 
                                        padding: 0,
                                         }} 

                                        src={context.user.picture} alt="Profile"/>
                                </figure>
                            </div>
                            :
                            <AccountCircle className={classes.AccountCircle} onClick={ context.methods.login}/>
                        }
                        </IconButton>
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
                             <MenuItem onClick={this.handleClose}><div onClick={context.methods.logout}>Logout</div></MenuItem>
                            </Menu>
                     
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

export default withContext(withRouter(withStyles(styles)(Header)))


