import React from "react";
import { useSelector } from "react-redux";
import { Channel, useChatContext } from "stream-chat-react";
// import { CreateChannel, EditChannel, ChannelInner, TeamMessage } from "./";
type Props = {};

const ChannelContainer = (props: Props) => {
	const { isCreating, isEditing, createType } = useSelector(
		(store: any) => store.app
	);
	const { channel } = useChatContext();

	if (isCreating) {
		return (
			<div className="channel__container">
				<CreateChannel />
			</div>
		);
	}
	if (isEditing) {
		return (
			<div className="channel__container">
				<EditChannel />
			</div>
		);
	}

	const EmptyState: any = () => {
		<div className="channel-empty__container">
			<p className="channel-empty__first">
				This is the begining of your Chat History
			</p>
			<p className="channel-empty__second">
				send messages, attachments, links, emojis and more
			</p>
		</div>;
	};
	return (
		<div className="channel__container  grad-bg">
			{/* <Channel
				EmptyStateIndicator={EmptyState}
				Message={(messageProps, i) => (
					// <MessageTeam key={i} {...messageProps} />
				)}>
				{/* <ChannelInner /> 
			</Channel> */}
		</div>
	);
};

export default ChannelContainer;
