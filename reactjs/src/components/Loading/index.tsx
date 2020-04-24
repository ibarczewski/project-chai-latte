import * as React from 'react';
//import { Spin } from 'antd';
//import movingsmoke from "src/Content/images/moving-smoke.gif";
import Stores from 'src/stores/storeIdentifier';
//import UserStore from 'src/stores/userStore';
import { observer, inject } from 'mobx-react';
//import AppComponentBase from 'src/components/AppComponentBase';

import UserStore from 'src/stores/userStore';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';
//import { LoadingComponentProps } from 'react-loadable';
//import { render } from 'react-dom';


export interface ILoadingProps extends FormComponentProps, RouteComponentProps {
  userStore: UserStore;
}


var Loading = inject(Stores.UserStore)(observer((props) => {

  //props.userStore.ChangeLoader(true);
  //let IsLoader = props.userStore.IsLoader;
  //alert(IsLoader);
  // let pointerEvents = IsLoader ? 'none' : 'initial';
  // let opacity = IsLoader ? 0.7 : 1;

  //style={{ textAlign: 'center' , width: '100px', height:'100px', pointerEvents: IsLoader ? 'none': 'initial', opacity : IsLoader ? 'none': 'initial'}}
  // , pointerEvents: IsLoader ? 'none': 'initial', opacity : IsLoader ? 0.7: 1
  return (
    // <div style={{ textAlign: 'center' }}>
    //   <img style={{ textAlign: 'center' , width: '100px', height:'auto' }} src={movingsmoke} alt="image" />
    // </div>
    <div>
    </div>

  )



}));

// @inject(Stores.UserStore)
// @observer
// class Loading extends React.Component<ILoadingProps,LoadingComponentProps> {
//   constructor(props){
//     super(props);
//   }
//   render(){
//     let IsLoader = this.props.userStore.IsLoader;
//     //let pointerEvents = IsLoader ? 'none' : 'initial';
//     //let opacity = IsLoader ? 0.7 : 1;
//     return(
//       <div style={{ textAlign: 'center' , width: '100px', height:'100px', pointerEvents: IsLoader ? 'none': 'initial', opacity : IsLoader ? 'none': 'initial'}}>
//       {/* <Spin size="large" /> */}
//         <img src={movingsmoke} alt="image" />
//       </div>
//     )
//   }
// }

export default Loading;
