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
	useChatContext,
} from "stream-chat-react";

// import { ChannelInfo } from "../assets";

export const GiphyContext = React.createContext({});

import { setGiphyState, setIsEditing } from "../Features/AppSlice";
// export const GiphyContext =
type Props = {};

const ChannelInner = (props: Props) => {
	const { giphyState, isEditing } = useSelector((store: any) => store.app);
	const dispatch = useDispatch();

	const { sendMessage } = useChannelActionContext();

	const overrideSubmitHandler = (message: any) => {
		let updatedMessage = {
			attachments: message.attachments,
			mentioned_users: message.mentioned_users,
			parent_id: message.parent?.id,
			parent: message.parent,
			text: message.text,
		};

		if (giphyState) {
			updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
		}

		if (sendMessage) {
			sendMessage(updatedMessage);
			setGiphyState();
		}
	};

	return (
		<GiphyContext.Provider value={{ giphyState, setGiphyState }}>
			<div style={{ display: "flex", width: "100%" }}>
				<Window>
					<TeamChannelHeader />
					<MessageList />
					<MessageInput overrideSubmitHandler={overrideSubmitHandler} />
				</Window>
				<Thread />
			</div>
		</GiphyContext.Provider>
	);
};

const TeamChannelHeader = () => {
	const { isEditing } = useSelector((store: any) => store.app);
	const dispatch = useDispatch();

	const { channel, watcher_count }: any = useChannelStateContext();
	const { client } = useChatContext();

	const MessagingHeader = () => {
		const members = Object.values(channel.state.members).filter(
			({ user }: any) => user.id !== client.userID
		);
		const additionalMembers = members.length - 3;

		if (channel.type === "messaging") {
			return (
				<div className="team-channel-header__name-wrapper">
					{members.map(({ user }: any, i) => (
						<div key={i} className="team-channel-header__name-multi">
							<Avatar
								image={user.image}
								name={user.fullName || user.id}
								size={32}
							/>
							<p className="team-channel-header__name user">
								{user.fullName || user.id}
							</p>
						</div>
					))}

					{additionalMembers > 0 && (
						<p className="team-channel-header__name user">
							and {additionalMembers} more
						</p>
					)}
				</div>
			);
		}

		return (
			<div className="team-channel-header__channel-wrapper">
				<p className="team-channel-header__name"># {channel.data.name}</p>
				<span
					style={{ display: "flex" }}
					onClick={() => dispatch(setIsEditing(true))}>
					{/* <ChannelInfo /> */}
				</span>
			</div>
		);
	};

	const getWatcherText = (watchers: any) => {
		if (!watchers) return "No users online";
		if (watchers === 1) return "1 user online";
		return `${watchers} users online`;
	};

	return (
		<div className="team-channel-header__container">
			<MessagingHeader />
			<div className="team-channel-header__right">
				<p className="team-channel-header__right-text">
					{getWatcherText(watcher_count)}
				</p>
			</div>
		</div>
	);
};

export default ChannelInner;
