import React from 'react';
import { Content } from 'carbon-components-react';
import EmployeeHeader from './components/EmployeeHeader'
import { Route, Switch } from 'react-router-dom';
import './app.scss';
import EmployeePage from './content/EmployeePage';


function App() {
  return (
    <>
    <EmployeeHeader />
    <Content>
      <Switch>
        <Route exact path="/" component={EmployeePage}/>
        <Route exact path="/employees" component={EmployeePage}/>
        <Route path="/source" component={ () => {
          window.location.href = "https://github.com/porowns/fs-takehome";
          return null;
        }}/>
      </Switch>
    </Content>
    </>
  );
}

export default App;
