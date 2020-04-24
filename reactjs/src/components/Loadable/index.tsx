import * as Loadable from 'react-loadable';
import Loading from './../Loading/index';
import UserStore from 'src/stores/userStore';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router-dom';


export interface ILoadingProps extends FormComponentProps, RouteComponentProps {
  userStore: UserStore;
}

const LoadableComponent = (component: any) =>
  Loadable({
    loader: component,
    loading: Loading,
    
  });

export default LoadableComponent;
