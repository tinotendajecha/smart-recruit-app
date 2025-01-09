'use client'
import React from 'react';
import UserInfoForm from '@/components/UserInfoForm';

const page = () => {
  return (
    <div>
        <UserInfoForm statement='Create your account to apply for job opening' role='candidate' />
    </div>
  )
}

export default page