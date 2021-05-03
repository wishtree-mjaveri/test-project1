import React, { useState, useEffect } from 'react';
import {
  Button, Dropdown, Layout, Menu, message, Popover, Select,
} from 'antd';
import Icon from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  Link, Route, Switch, useHistory,
} from 'react-router-dom';
import Axios from 'axios';
import CustomScrollbars from '../../util/CustomScrollbars';
import languageData from '../../containers/Topbar/languageData';
import SearchBox from '../../components/SearchBox';
import UserInfo from '../../components/UserInfo';
import AppNotification from '../../components/AppNotification';
import MailNotification from '../../components/MailNotification';
import HorizontalNav from '../../containers/Topbar/HorizontalNav';
// import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import IntlMessages from '../../util/IntlMessages';
import localforage from 'localforage'
import { instance, signout } from '../constants/Api';

const { Header } = Layout;

const { Option } = Select;
const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Apps</Menu.Item>
    <Menu.Item key="3">Blogs</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  message.info('Click on menu item.');
}

function handleChange(value) {
  console.log(`selected ${value}`);
}
const headers = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};
const HorizontalDark = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const locale = useSelector(({ settings }) => settings.locale);
  const navCollapsed = useSelector(({ settings }) => settings.navCollapsed);

  const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map((language) => (
          <li
            className="gx-media gx-pointer"
            key={JSON.stringify(language)}
            onClick={(e) => dispatch(switchLanguage(language))}
          >
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`} />
            <span className="gx-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value);
  };
  const handleLogout = () => {
    instance.post(signout)
    // Axios.post(
    //   'http://localhost:1337/user/logout',
    //   { headers },
    //   { withCredentials: true },
    // )
      .then((res) => {
        console.log(res.data);

        history.push('/restaurants');
      })
      .catch((error) => console.log(error));
      localforage.setItem('user-key','')
  };

  const handleSearch = async () => {
    const search = props.search.toLowerCase();
    await Axios.get(`http://localhost:1337/api/description/restaurants?text=${search}`, {headers:{  Accept: 'application/json',
    'Content-Type': 'application/json',}, withCredentials: true })
      .then((result) => {
        console.log(result.data.restaurantList);
        props.setrestaurants(result.data.restaurantList);
      })
      .catch((error) => console.log(error));
    setSearchText('');
  };

  useEffect(() => {
    Axios.get(`http://localhost:1337/api/description/restaurants?text=${props.search}`, { withCredentials: true })
      .then((result) => {
        console.log(result.data);
        if (result.data.status == 300) {
          history.push('/restaurants');
          message.error('Please Login');
        }
        if (result.data.status == 403) {
          history.push('/restaurants');
          message.info('Verify your email account');
        }
        if (result.data.status == 401) {
          history.push('/restaurants');
          message.error('Please Login');
        }
        props.setrestaurants(result.data.restaurantList);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleChange = (e) => props.setSearch((e.target.value));
  return (
    <div className="gx-header-horizontal gx-header-horizontal-dark">
      {/* <div className="gx-header-horizontal-top">
        <div className="gx-container" >
          <div className="gx-header-horizontal-top-flex">
            <div className="gx-header-horizontal-top-left">
              <i className="icon icon-alert gx-mr-3"/>
              <p className="gx-mb-0 gx-text-truncate"><IntlMessages id="app.announced"/></p>
            </div>

          </div>
        </div>
      </div> */}

      <Header
        style={{ paddingBottom: '10px' }}
        className="gx-header-horizontal-main"
      >
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
              <i
                className="gx-icon-btn icon icon-menu"
                onClick={() => {
                  dispatch(toggleCollapsedSideNav(!navCollapsed));
                }}
              />

            </div>
            <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo" />
            {/* <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"> */}
            <h1 style={{
              float: 'left', color: 'white', fontFamily: 'Paytone One, sans-serif', fontSize: '40px', fontWeight: 'bold',
            }}
            >
              Zonions
            </h1>

            {/* </Link> */}
            {/* <img alt="zonion" src={require("../../../assets/images/Z-Letter-PNG.png")} height={30} width={30}/> */}
            <div className="gx-header-search gx-d-none gx-d-lg-flex">

              <SearchBox
                styleName="gx-lt-icon-search-bar-lg"
                placeholder="Search in app for dish,city"
                onChange={handleChange}
                value={props.search}
              />
              <Button onClick={handleSearch}>Search</Button>
              {/* <Select defaultValue="lucy" style={{width: 120}} onChange={handleChange}>
                <Option value="jack">City</Option>
                <Option value="lucy">cousine</Option>
                <Option value="Yiminghe">Restaurants</Option>
              </Select>
              */}
            </div>

            <ul className="gx-header-notifications gx-ml-auto ">
              {/* <li className="gx-notify gx-notify-search gx-d-inline-block gx-d-lg-none">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={
                  <div className="gx-d-flex"><Dropdown overlay={menu}>
                    <Button>
                      Category <Icon type="down"/>
                    </Button>
                  </Dropdown>
                    <SearchBox styleName="gx-popover-search-bar"
                               placeholder="Search in app..."
                               onChange={updateSearchChatUser}
                               value={searchText}/></div>
                } trigger="click">
                  <span className="gx-pointer gx-d-block"><i className="icon icon-search-new"/></span>

                </Popover>
              </li>  */}

              {/* <li className="gx-notify">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={<AppNotification/>}
                         trigger="click">
                  <span className="gx-pointer gx-d-block"><i className="icon icon-notification"/></span>
                </Popover>
              </li> */}

              {/* <li className="gx-msg">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                         content={<MailNotification/>} trigger="click">
                <span className="gx-pointer gx-status-pos gx-d-block">
                <i className="icon icon-chat-new"/>
                <span className="gx-status gx-status-rtl gx-small gx-orange"/>
                </span>
                </Popover>
              </li> */}
              {/* <li className="gx-language">
                <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight"
                         content={languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row gx-align-items-center"><i
                className={`flag flag-24 flag-${locale.icon}`}/>
              </span>
                </Popover>
              </li> */}
              {/* <li className="gx-user-nav"><UserInfo/></li> */}

              <li>
                {' '}
                <Button onClick={handleLogout}>Logout</Button>
              </li>

            </ul>
          </div>
        </div>
      </Header>
      <div className="gx-header-horizontal-nav gx-d-none gx-d-lg-block">
        <div className="gx-container">
          <div className="gx-header-horizontal-nav-flex">
            <HorizontalNav />
            {/* <ul className="gx-header-notifications gx-ml-auto">
              <li><span className="gx-pointer gx-d-block"><i className="icon icon-menu-lines"/></span></li>
              <li><span className="gx-pointer gx-d-block"><i className="icon icon-setting"/></span></li>
              <li><span className="gx-pointer gx-d-block"><i className="icon icon-apps-new"/></span></li>
            </ul> */}

          </div>
        </div>
      </div>
    </div>
  );
};
export default HorizontalDark;
