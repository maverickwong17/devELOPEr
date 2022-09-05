import React from 'react';
import { useQuery } from "@apollo/client";
import DevChat from './Chat';
import PubNub from "pubnub";
import { PubNubProvider } from "pubnub-react";
import { QUERY_ME } from "../../utils/queries";
import Loader from '../Loader/Loader';

const DevChatWrap = () => {
    let pnName;

    const { loading, data } = useQuery(QUERY_ME);

    const user = data?.me || data?.user || {};

    if (loading) {
        return <Loader />;
    }

    if (!user) {
        return (
            <h4>
                You must be logged in to slide into DMs.
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