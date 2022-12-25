import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
	MessageList,
	MessageInput,
	Thread,
	Window,
	useChannelActionContext,
	Avatar,
	useChannelStateContext,
} from "stream-chat-react";
import { setGiphyState } from "../Features/AppSlice";
// export const GiphyContext =
type Props = {};

const ChannelInner = (props: Props) => {
	const { giphyState } = useSelector((store: any) => store.app);
	const dispatch = useDispatch();

	const overrideSubmitHandler = (message: any) => {
		let updatedMessage = {
			attachments: message.attachments,
			mentioned_users: message.mentioned_users,
			parent_id: message.parent?.id,
			parent: message.parent,
			text: message.text,
		};
	};

	if (giphyState) {
		updatedMessage = { ...updatedMessage, text: `'giphy ${message.text}` };
	}

	if (sendMessage) {
		sendMessage(updatedMessage);
		dispatch(setGiphyState());
	}
	return <div>ChannelInner</div>;
};

export default ChannelInner;
