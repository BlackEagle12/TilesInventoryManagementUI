import React, { useEffect } from 'react'
import Loader from '../../components/myComponents/Loader';
import { useGetPermissionsMutation } from '../../redux/reducer/api/userApi';
import { useNavigate } from 'react-router-dom';

const Authorized = () => {

  const navigate = useNavigate();

  const [getPermissions,{data:permissionList,isLoading,isSuccess}]=useGetPermissionsMutation();

  useEffect(()=>{
    getPermissions({});
  },[]);
  
  useEffect(()=>{
    isSuccess && navigate('/stocks');
  },[isSuccess]);

  return (
    <div className='w-100 h-100'>
       {
        isLoading && <Loader />
      }
    </div>
  )
}

export default Authorized