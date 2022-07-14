import React from 'react';
import './App.css';
import './app.scss';
import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom';
//import { NativeRouter, BackButton } from 'react-router-native';
import Template from './cmps/template';
import StoryCheck from './views/story-check';
import Testimony from './views/testimony/testimony';
import TextEdit from './views/text';
import StoryUpload from './views/story-upload';
import { TemplateEdit } from './views/template-edit';
import { Share } from './views/share/share.jsx';
import About from './views/about';
import Footer from './cmps/footer'
import Homepage from './views/homepage';

//import BackButton from './backButton/backButton';
import ThankYouForComing from './views/thank-you'
import { Header } from './cmps/header';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './views/auth/Login';
import SignUp from './views/auth/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route exact path='/storyCheck' component={StoryCheck} />
        <Route exact path='/testimony/:storyId' component={Testimony} />
        <Route exact path='/textEdit' component={TextEdit} />
        <Route exact path='/storyUpload' component={StoryUpload} />
        <Route exact path='/templateEdit' component={TemplateEdit} />
        <Route exact path='/share' component={Share} />
        <Route exact path='/thankYouForComing' component={ThankYouForComing} />
        <Route exact path='/About' component={About} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={SignUp} />
        <Route path='*' component={() => '404 Not Found'} />
      </Switch>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
