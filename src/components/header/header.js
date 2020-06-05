import React from 'react'
import { NavLink, useHistory } from 'react-router-dom';

const Header = ({userLoggedIn, setUserLoggedIn}) => {

    const history = useHistory();
    const pseudo = userLoggedIn && userLoggedIn.email.split('@', 1).join();

    const logOUt = () => {
        setUserLoggedIn(null);
        history.push('/home')
    }

    const tryRequire = (path) => {
        try {
            return require(`../avatar/${path}`);
        } catch (err) {
            return require(`../avatar/default.jpg`);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark d-flex">
            <NavLink to='/home' className="navbar-brand text-white">MailBox</NavLink>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    {/* <li className="nav-item active">
                        <NavLink to='/home' className="text-white">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/dashboard' className="text-white">Dashboard</NavLink>
                    </li> */}
                </ul>
                <div className="d-flex text-white">
                    {!userLoggedIn ? (
                        <div>
                            <NavLink to='/login' className='text-white mr-2'><i className="fa fa-sign-in"></i></NavLink>
                            |
                            <NavLink to='/register' className='text-white ml-2 mr-2'><i className="fa fa-user-plus"></i></NavLink>
                        </div>
                    ) : (
                        <div>
                            <img src={tryRequire(`${pseudo}.jpg`)} alt='avatar' width='50' height='40' className='bg-white rounded-circle mr-2 border border-white' /><span className='text-white mr-2'>{pseudo}</span>
                            |
                            <span onClick={logOUt} className='text-white ml-2 mr-2 logout'><i className="fa fa-sign-out fa-10x"></i></span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Header;