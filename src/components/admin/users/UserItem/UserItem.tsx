"use client"
import React, {FC, useState} from 'react';
import "./userItem.scss";
import {formatDate} from "@/utils/formatDate";

interface UserItemProps {
    user: any;
}

const UserItem: FC<UserItemProps> = ({user}) => {


    return (
        <div className="container-user-item">
            <div className="id">{user.id}</div>
            <div className="date">{formatDate(user.createdAt)}</div>
            <div className="date">{formatDate(user.updateAt)}</div>
            <div className="date">{formatDate(user.deleteAt)}</div>
            <div className="boolean">{user.isDelete ? "true" : "false"}</div>
            <div className="date">{user.name}</div>
            <div className="date">{user.surname}</div>
            <div className="email">{user.email}</div>
            <div className="boolean">{user.isEmailVerified ? "true" : "false"}</div>
            <div className="date">{user.phone}</div>
            <div className="boolean">{user.isPhoneVerified ? "true" : "false"}</div>
            <div className="date">{user.role}</div>
        </div>
    );
};

export default UserItem;