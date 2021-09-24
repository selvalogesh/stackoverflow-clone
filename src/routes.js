import React from 'react';
import {Switch, Route} from 'react-router-dom';
import withPageTitle from './services/withPageTitle';

import PageContainer from './components/PageContainer/PageContainer.component';
import HomePage from './pages/HomePage/HomePage.component';
import QuestionsPage from './pages/QuestionsPage/QuestionsPage.component';
import Login from './pages/Login/Login.component';
import UserPage from './pages/UserPage/UserPage.component';
import NotFound from './pages/NotFound/NotFound.component';

const HomePageComponent = withPageTitle({
  component: PageContainer({component: HomePage}),
  title:
    'CLONE Stack Overflow',
});

const QuestionsPageComponent = withPageTitle({
  component: PageContainer({component: QuestionsPage}),
  title: 'All Questions',
});


const LoginComponent = withPageTitle({
  component: Login,
  title: 'Log In',
});

const NotFoundComponent = withPageTitle({
  component: NotFound,
  title: 'Error 404',
});


const UserPageComponent = PageContainer({component: UserPage});


const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={HomePageComponent} />
      <Route exact path='/questions' component={QuestionsPageComponent} />
      <Route exact path='/login' component={LoginComponent} />
      <Route exact path='/users/:id' component={UserPageComponent} />
      <Route path='*' component={NotFoundComponent} />
    </Switch>
  );
};

export default Routes;
