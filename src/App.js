import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

// FIREBASE
import { auth, handleUserProfile } from "./firebase/utils";

// Actions
import { setCurrentUser } from './redux/user/user.actions';

// LAYOUTS
import MainLayout from './layouts/MainLayout';
import HomepageLayout from './layouts/HomepageLayout';

// PAGES
import Homepage from './pages/Homepage'
import Registartion from './pages/Registration';
import Login from './pages/Login';
import Recovery from './pages/Recovery';
import Dashboard from './pages/Dashboard';

// HOC
import WithAuth from "./hoc/withAuth"

import './default.scss'

const App = props => {

  // SYNTAX
  // const count = 1;
  // useEffect(() => {
  //   // COMPONENT DIDMOUNT
  //   return () => {
  //     // COMPONENT WILL UNMOUNT
  //   }
  // }, [count])

  const dispatch = useDispatch();

  useEffect(() => {
    const authListener = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot(snapshot => {
         dispatch(setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          }));
        })
      }

      dispatch(setCurrentUser(userAuth));
    });

    return () => {
      authListener();
    }
  }, [])

  return (
    <div className="App">
      <React.Suspense>
        <Switch>
          <Route exact path="/" render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )} />
          <Route path="/dashboard" render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )} />
          <Route exact path="/registration"
            render={() => (
              <MainLayout>
                <Registartion />
              </MainLayout>
            )} />
          <Route exact path="/login"
            render={() => (
              <MainLayout>
                <Login />
              </MainLayout>
            )} />
          <Route path="/recovery" render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )} />
        </Switch>
      </React.Suspense>
    </div>
  );
}

// const mapStateToProps = ({ user }) => ({
//   currentUser: user.currentUser
// });

// const mapDispatchToProps = dispatch => ({
//   setCurrentUser: user => dispatch(setCurrentUser(user))
// });

// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
