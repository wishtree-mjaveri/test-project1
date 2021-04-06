import React, {useState} from "react";
import {Button, Dropdown, Layout, Menu, message, Popover, Select} from 'antd';
import Icon from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import CustomScrollbars from "../../../util/CustomScrollbars";
import languageData,{setlanguageData} from "../languageData";
import SearchBox from "../../../components/SearchBox";
import UserInfo from "../../../components/UserInfo";
import AppNotification from "../../../components/AppNotification";
import MailNotification from "../../../components/MailNotification";
import {Link, Route, Switch} from "react-router-dom";
import HorizontalNav from "../HorizontalNav";
import {switchLanguage, toggleCollapsedSideNav} from "../../../appRedux/actions/Setting";
import IntlMessages from "../../../util/IntlMessages";
import SignIn from "../../../routes/admin/SignIn";

import Z_logo from "../../../assets/images/Z-Letter-PNG.png"
import Home from "../../../routes/admin/Home"
import SignUP from '../../../routes/admin/SignUp'
import {GlobalOutlined} from '@ant-design/icons'
import localforage from 'localforage'
 

const {Header} = Layout;

const Option = Select.Option;
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
// localforage.setDriver(localforage.LOCALSTORAGE)
const HorizontalDark = () => {

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const locale = useSelector(({settings}) => settings.locale);
  const navCollapsed = useSelector(({settings}) => settings.navCollapsed);


  const languageMenu = () => (
    <CustomScrollbars className="gx-popover-lang-scroll">
      <ul className="gx-sub-popover">
        {languageData.map(language =>
          <li className="gx-media gx-pointer" key={JSON.stringify(language)} onClick={(e) =>{
            // localforage.setItem('setlanguageData',language,()=>{
            //   console.log(languageData)
            // })
            dispatch(switchLanguage(language))}
          }>
            <i className={`flag flag-24 gx-mr-2 flag-${language.icon}`}/>
            <span className="gx-language-text">{language.name}</span>
          </li>
        )}
      </ul>
    </CustomScrollbars>);

  const updateSearchChatUser = (evt) => {
    setSearchText(evt.target.value)
  };

  return (
    <div className="gx-header-horizontal gx-header-horizontal-dark"   >
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
     
      <Switch>
        <Route path="/home" component={Home} />
      </Switch>

      <Header style={{paddingBottom:"10px"}}
        className="gx-header-horizontal-main" >
        <div className="gx-container">
          <div className="gx-header-horizontal-main-flex">
            <div className="gx-d-block gx-d-lg-none gx-linebar gx-mr-xs-3">
              <i className="gx-icon-btn icon icon-menu"
                 onClick={() => {
                   dispatch(toggleCollapsedSideNav(!navCollapsed));
                 }}
              />

            </div>
            <Link to="/" className="gx-d-block gx-d-lg-none gx-pointer gx-mr-xs-3 gx-pt-xs-1 gx-w-logo">
              <img alt="" src={require("../../../assets/images/w-logo.png")}/></Link>
            {/* <Link to="/" className="gx-d-none gx-d-lg-block gx-pointer gx-mr-xs-5 gx-logo"> */}
  <h1 style={{float:'left',color:"white",fontFamily: 'Paytone One, sans-serif',fontSize:"40px",fontWeight:"bold"}}>Zonions</h1>

            {/* </Link> */}
            {/* <img alt="zonion" src={require("../../../assets/images/Z-Letter-PNG.png")} height={30} width={30}/> */}
            <div className="gx-header-search gx-d-none gx-d-lg-flex">

              {/* <SearchBox styleName="gx-lt-icon-search-bar-lg"
                         placeholder="Search in app..."
                         onChange={updateSearchChatUser}
                         value={searchText}/> */}

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
              <li className="gx-language gx-pointer gx-flex-row " style={{gap:"5px"}} >
                <Popover overlayClassName="gx-popover-horizantal" placement="leftTop"
                         content={languageMenu()} trigger="click">
              <span className="gx-pointer gx-flex-row ">
              <Button>
              <GlobalOutlined />

                Choose language</Button>
           
              </span>
                </Popover>
              {/* <span className="gx-pointer gx-flex-row "> */}

               
            {/* </span> */}
              {/* </li> */}
              {/* <li className="gx-user-nav"><UserInfo/></li> */}
             
              {/* <li className="gx-language">  */}
               <span className="gx-pointer gx-flex-row "><SignIn />
              <SignUP /></span> </li> 
          
            </ul>
          </div>
        </div>
      </Header>
      <div className="gx-header-horizontal-nav gx-d-none gx-d-lg-block" >
        <div className="gx-container">
          <div className="gx-header-horizontal-nav-flex">
            <HorizontalNav/>
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
