import React, {memo, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import URLSearchParams from 'url-search-params'
import {Redirect, Route, Switch, useHistory, useLocation, useRouteMatch} from "react-router-dom";
import {ConfigProvider} from 'antd';
import {IntlProvider} from "react-intl";
import Error404 from '../../routes/customViews/errorPages/404/index'
import AppLocale from "../../lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import {setInitUrl} from "../../appRedux/actions/Auth";
import {onLayoutTypeChange, onNavStyleChange, setThemeType} from "../../appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK
} from "../../constants/ThemeSetting";
import Home from "../../routes/admin/Home";
import UserHome from "../../routes/user/UserHome";
import RestaurantDetails from "../../routes/user/RestaurantDetails";
import UserHomePage from "../../routes/admin/UserHomePage";
import RestaurantInfo from "../../routes/user/RestaurantsInfo";

const RestrictedRoute = ({component: Component, location, authUser, ...rest}) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: {from: location}
          }}
        />}
  />;


const App = (props) => {

  const dispatch = useDispatch();
  const {locale, themeType, navStyle, layoutType} = useSelector(({settings}) => settings);
  const {authUser, initURL} = useSelector(({auth}) => auth);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();


  useEffect(() => {
        if (initURL === '') {
      dispatch(setInitUrl(location.pathname));
    }
    const params = new URLSearchParams(location.search);

    if (params.has("theme")) {
      dispatch(setThemeType(params.get('theme')));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get('nav-style')));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get('layout-type')));
    }
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  });


  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  const setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      // if (authUser === null) {
      //   history.push('/signin');
      // } 
       if (initURL === '' || initURL === '/' || initURL === '/signin') {
        history.push('/userHome');
      } else {
        history.push(initURL);
      }
    }
  }, [authUser, initURL, location, history]);

  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      console.log("adding dark class")
      document.body.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
      let link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = "/css/dark_theme.css";
      link.className = 'style_dark_theme';
      document.body.appendChild(link);
    }}
  ,[]);

  const currentAppLocale = AppLocale[locale.locale];
    const someid=""
  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>

        <Switch>
          <Route exact path='/signin' component={SignIn}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route path="/home" component={Home} />
          <Route path="/userhomepage" component={UserHomePage}/>
          <Route path={`/restaurantdetails/${someid}`}  component={RestaurantDetails} />
          <Route path="/restaurantinfo" component={RestaurantInfo}/>
          <RestrictedRoute path={`${match.url}`} authUser={authUser} location={location}
                           component={MainApp}/>
          <Route component={Error404} />
        </Switch>
      </IntlProvider>
    </ConfigProvider>
  )
};

export default memo(App);
