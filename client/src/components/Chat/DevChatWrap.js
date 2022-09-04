import React from 'react';
import { useQuery } from "@apollo/client";
import DevChat from './Chat';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { QUERY_ME } from "../../utils/queries";
import { RiContrastDropLine } from 'react-icons/ri';
import Loader from '../Loader/Loader';
import { getFormControlUnstyledUtilityClass } from '@mui/base';

const DevChatWrap = () => {
    let pnName;

    const { loading: loadme, data: profile } = useQuery(QUERY_ME);

    const user = profile?.me || {};
    
    if (loadme) {
        return <Loader />;
    }
    if (!user) {
        return (
            <h4>
                You need to be logged in to slide into DMs.
            </h4>
        );
    }
    pnName = user.profile.firstName;

    const pubnub = new PubNub(
        {
            publishKey: process.env.REACT_APP_MY_PUBLISH_KEY,
            subscribeKey: process.env.REACT_APP_MY_SUBSCRIBE_KEY,
            uuid: pnName
        })

    return (
        <PubNubProvider client={pubnub}>
            <DevChat />
        </PubNubProvider>
    )
}

export default DevChatWrap;