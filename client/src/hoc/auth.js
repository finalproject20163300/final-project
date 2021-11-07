import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {auth} from '_actions/user_actions';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (SpecificComponent, reload, adminRoute = null) {
  function AutehnticationCheck(props){
    let user = useSelector(state => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(auth()).then(res => {
        if (!res.payload.isAuth){
          if(reload){
            props.history.push('/login');
          }
        } else {
          if(adminRoute && !res.payload.isAdmin) {
            props.history.push('/');
          }
          else {
            if(reload === false){
              props.history.push('/');
            }
          }
        }
      })
    }, [dispatch, props.history, user.googleAuth])
    return (
      <SpecificComponent {...props} user={user}/>
    )
  }
  return AutehnticationCheck;
}