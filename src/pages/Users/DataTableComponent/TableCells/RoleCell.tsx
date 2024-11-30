import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { useGetAllRoleQuery, useGetRoleQuery } from '../../../../redux/reducer/api/commonApi';
import { useUpdateUserMutation, useUpdateUserRoleMutation } from '../../../../redux/reducer/api/userApi';
import { WarningDialog } from '../../WarningDialog/WarningDialog';
import { Button } from '../../../../components/ui/button';

const RoleCell = ({row}) => {


  const { data: roleList } = useGetAllRoleQuery({});

  const [updateUserRole,{isLoading:isSubmitting,isSuccess,isError}]=useUpdateUserRoleMutation();

  const [showDialog,setShowDialog]=useState(false);
  const [roleId,setRoleId]=useState(0);

  useEffect(()=>{
    setRoleId(row.roleId);
  },[row.roleId]);

  useEffect(()=>{
    if(isError){
      setRoleId(row.roleId);
    }
  },[isError]);

  const handleOnChange=(value)=>{
    setShowDialog(true);
    setRoleId(value);
  }

  const handleConfirm=()=>{
    updateUserRole({
        id:row.id,
        roleId:roleId
    });
    setShowDialog(false);
  }

  const handleCancel=()=>{
    setShowDialog(false);
    setRoleId(row.roleId);
  }
  
  return (
    <>
        <Select
        onValueChange={handleOnChange}
        value={roleId?.toString()}
    >
        <SelectTrigger>
            <SelectValue placeholder="Select a Role" />
        </SelectTrigger>
            <SelectContent>
             {  roleList &&
                roleList.length > 0 &&
                roleList.map(
                (role: { value: number; text: string }) => (
                    <SelectItem value={role.value?.toString()}>
                       {role.text}
                    </SelectItem>
                  )
                )}
            </SelectContent>
        </Select>
        <WarningDialog
            title="Update User Role"
            description={`Are you sure you want to change role to "${(roleId && roleList?.find(role=>role.value==roleId))?.text}" for "${row.firstName}"?`}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            isOpen={showDialog}
        />
    </>

  )
}

export default RoleCell