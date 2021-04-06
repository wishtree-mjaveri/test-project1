import {SWITCH_LANGUAGE, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH} from "../../constants/ActionTypes";
import {
  LAYOUT_TYPE,
  LAYOUT_TYPE_FULL,
  NAV_STYLE,
  NAV_STYLE_FIXED,
  THEME_COLOR,
  THEME_TYPE,
  THEME_TYPE_SEMI_DARK,
  NAV_STYLE_DARK_HORIZONTAL
} from "../../constants/ThemeSetting";
import {languageData} from '../../containers/Topbar/languageData'
import localforage from 'localforage'



let localobject={ 
  
}

const defaultLocal = ()=>{
  localforage.getItem('languageData',(err,val)=>{
    if(err){
      localobject={languageId: 'english',
      locale: 'en',
      name: 'English',
      icon: 'us'}
      console.log("bydefault lang eng")
    }else{
      localobject={val}
      console.log("last selected lang")
    }
  })
}
 
  localforage.getItem('setlanguageData').then(result=>{console.log(result), localobject=result}).catch(err=>console.log(err))

let initialSettings = {
  navCollapsed: true,
  navStyle: NAV_STYLE_DARK_HORIZONTAL,
  layoutType: LAYOUT_TYPE_FULL,
  themeType: THEME_TYPE_SEMI_DARK,
  themeColor: THEME_COLOR,

  pathname: '/',
  width: window.innerWidth,
  isDirectionRTL: false,
  locale: {languageId: 'english',
  locale: 'en',
  name: 'English',
  icon: 'us'}
  

};

// initialSettings.locale=localobject==null?{  languageId: 'english',
// locale: 'en',
// name: 'English',
// icon: 'us'}:localobject;

const settings = (state = initialSettings, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false
      };
    case TOGGLE_COLLAPSED_NAV:
      return {
        ...state,
        navCollapsed: action.navCollapsed
      };
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case THEME_TYPE:
      return {
        ...state,
        themeType: action.themeType
      };
    case THEME_COLOR:
      console.log("yes",action.themeColor);
      return {
        ...state,
        themeColor: action.themeColor
      };

    case NAV_STYLE:
      return {
        ...state,
        navStyle: action.navStyle
      };
    case LAYOUT_TYPE:
      return {
        ...state,
        layoutType: action.layoutType
      };

    case SWITCH_LANGUAGE:
      localforage.setItem('setlanguageData',action.payload,()=>{
        console.log(languageData)
      })
      return {
        ...state,
        locale: action.payload,

      };
    default:
      return state;
  }
};

export default settings;
