import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';

import Login from './containers/login';
import SiderDemo from './components/basic-layout';
import routes from './config/routes';
// import Category from './components/category';
import {en, zhCN} from './locales';

import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';

// console.log(routes);


@connect(
    (state) => ({language: state.language}),null
)
class App extends Component {
    render() {
        const language = this.props.language; 
        const isEN = language === 'en'

        return (
            <ConfigProvider locale={isEN ? en_US : zh_CN}>
                <IntlProvider locale={language} messages={isEN ? en : zhCN}>
                <Router>
                    <Switch>
                        <Route path='/login' exact component={Login} />
                        <SiderDemo>
                            {routes.map((route) => {
                                
                            return <Route {...route} key={route.path}/>
                            })}
                            
                        </SiderDemo>
                    </Switch>
                </Router>
            </IntlProvider>
            </ConfigProvider>
            
        )
    }
}
export default App;