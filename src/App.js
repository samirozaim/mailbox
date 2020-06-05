import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header';
import { Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/authentification/login';
import Register from './components/authentification/register'
import Home from './components/home/home';
import './components/style/all.css'
import MailBox from './components/mailbox';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersAction } from './components/store/actions';
import { usersSelector } from './components/store/selectors';

function App() {

  const users = useSelector((state => usersSelector(state)))

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersAction())
  }, [dispatch])

  const initialUserLoggedIn = localStorage.getItem('userLoggedIn') ? JSON.parse(localStorage.getItem('userLoggedIn')) : null

  const [userLoggedIn, setUserLoggedIn] = useState(initialUserLoggedIn);

  useEffect(() => {
      localStorage.setItem('userLoggedIn', JSON.stringify(userLoggedIn))
      // console.log('LoggedIn user local storage :', JSON.parse(localStorage.getItem('userLoggedIn')))
  }, [userLoggedIn])

  // console.log('userLoggedIn APP *** ', userLoggedIn)

  return (
      <div className='d-flex flex-column vh-100'>
        <Header userLoggedIn={userLoggedIn} setUserLoggedIn={setUserLoggedIn}/>
        <Switch>
          {userLoggedIn ? (
            <>
              <Route path='/mailbox/:inbox' component={() => <MailBox userLoggedIn={userLoggedIn} />}/>
              <Redirect to='/mailbox/inbox' />
            </>
          ) : (
            <>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/login' component={() => <Login users={users} setUserLoggedIn={setUserLoggedIn} />}/>
              <Route exact path='/register' component={() => <Register users={users} setUserLoggedIn={setUserLoggedIn} />}/>
              <Redirect to='/home'/>
            </>
          ) }
        </Switch>
      </div>
  );
}

export default App;
