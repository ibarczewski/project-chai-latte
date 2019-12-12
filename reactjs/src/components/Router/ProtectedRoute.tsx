import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
//import { isGranted } from 'src/lib/abpUtility';
//import AppConsts from './../lib/appconst';
import AppConsts from 'src/lib/appconst';

const ProtectedRoute = ({ path, component: Component, permission, render, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={props => {
        
        // if (!abp.session.userId)     
        if(abp.utils.getCookieValue(AppConsts.User.UserId) == null)   {
          alert('hi')
          return (
            <Redirect
              to={{
                pathname: '/user/Desktop_Login',
                state: { from: props.location },
              }}
            />

            //alert('You can not open this page without login')
          );
        } 
        

        // if (permission && !isGranted(permission)) {         
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: '/exception?type=401',
        //         state: { from: props.location },
        //       }}
        //     />
        //   );
        // }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
