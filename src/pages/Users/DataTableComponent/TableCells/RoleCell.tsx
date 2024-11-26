import React, { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { useGetRoleQuery } from '../../../../redux/reducer/api/commonApi';
import { useUpdateUserMutation } from '../../../../redux/reducer/api/userApi';
import { WarningDialog } from '../../WarningDialog/WarningDialog';
import { Button } from '../../../../components/ui/button';

const RoleCell = ({row}) => {

  const { data: roleList, isLoading: isRolesLoaing } = useGetRoleQuery({});

  const [updateUser,{isLoading:isSubmitting,isSuccess}]=useUpdateUserMutation();

  const [showDialog,setShowDialog]=useState(false);
  const [roleId,setRoleId]=useState(0);

  useEffect(()=>{
    if(isSuccess){

    }
  },[]);

  const handleOnChange=(value)=>{
    setShowDialog(true);
    setRoleId(value);
  }

  const handleConfirm=()=>{
    updateUser({
        ...row,
        roleId:roleId
    });
  }

  return (
    <>
        <Select
        onValueChange={handleOnChange}
        defaultValue={row.value}
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
            title="Update User"
            description="Are you sure you want to change role?"
            onConfirm={handleConfirm}
            isOpen={showDialog}
        />
    </>

  )
}

export default RoleCell