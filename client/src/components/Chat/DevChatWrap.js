import React, { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import DevChat from './Chat';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { useParams, Navigate } from "react-router-dom";
import { QUERY_USER, QUERY_ME } from "../../utils/queries";
import { RiContrastDropLine } from 'react-icons/ri';
import Loader from '../Loader/Loader';
import Auth from '../../utils/auth';
import { getFormControlUnstyledUtilityClass } from '@mui/base';

const DevChatWrap = () => {

    // let pnUUID;
    let pnName;

    const { loading: loadme, data: profile } = useQuery(QUERY_ME);

    const user = profile?.me || {};
    
    if (loadme) {
        return <Loader />;
    }
    if (!user) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }
    // pnUUID = user._id;
    // console.log(pnUUID);
    pnName = user.profile.firstName;
    // console.log(user.profile.firstName);

    const pubnub = new PubNub(
        {
            publishKey: process.env.REACT_APP_MY_PUBLISH_KEY,
            subscribeKey: process.env.REACT_APP_MY_SUBSCRIBE_KEY,
            // uuid: pnUUID,
            uuid: pnName
            // uuid: useMyQuery(),
            // userId: useMyQuery(),
        })

    return (
        <PubNubProvider client={pubnub}>
            <DevChat />
        </PubNubProvider>
    )
}

export default DevChatWrap;