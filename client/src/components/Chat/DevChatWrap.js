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
    // useMyQuery();
    let pnUUID;
    let pnName;
    // const [pnUUID, setpnUUID] = useState();

    // const useMyQuery = () => {
    const { _id: userParam } = useParams();
    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { _id: userParam },
    });
    // console.log(data)

    const user = data?.me || data?.user || {};
    if (Auth.loggedIn() && Auth.getProfile().data.email === userParam) {
        return <Navigate to="/profile" />;
    }

    if (loading) {
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
    // console.log(user);
    pnUUID = user._id;
    console.log(pnUUID);
    // setpnUUID(user._id);
    console.log(user.profile.firstName);
    // console.log(pnUUID);
    // return pnUUID;
    // }
    // useMyQuery();

    // useEffect(() => {
    //     function useMyQuery() {
    //         const { _id: userParam } = useParams();
    //         const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    //             variables: { _id: userParam },
    //         });

    //         const user = data?.me.profile || data?.user.profile || {};
    //         console.log(user);
    //         setpnUUID(user._id);
    //         console.log(pnUUID);
    //         // return pnUUID;
    //     } 
    //     useMyQuery()
    // }, []);


    const pubnub = new PubNub(
        {
            publishKey: process.env.REACT_APP_MY_PUBLISH_KEY,
            subscribeKey: process.env.REACT_APP_MY_SUBSCRIBE_KEY,
            uuid: pnUUID,
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