import React from "react";

import { Avatar, useChatContext } from "stream-chat-react";
type TeamProps = {
	channel: any;
	type: any;
};

const TeamChannelPreview = ({ channel, type }: TeamProps) => {
	const { channel: activeChannel, client } = useChatContext();

	const ChannelPreview = () => (
		<p className="channel-preview__item">
			# {channel?.data?.name || channel?.data?.id}
		</p>
	);

	const DirectPreview = () => {
		const members: any = Object.values(channel.state.members).filter(
			({ user }: any) => user.id !== client.userID
		);
		return (
			<div className="channel-preview__item single">
				<Avatar
					image={members[0].user.image}
					name={members[0]?.user?.fullName}
					size={24}
				/>
				<p>{members[0]?.user?.fullName}</p>
			</div>
		);
	};

	return (
		<div
			className={
				channel?.id === activeChannel?.id
					? "channel-preview__wrapper__selected"
					: "channel-prreview__wrapper"
			}
			onClick={() => {
				console.log(channel);
			}}>
			{type === "team" ? <ChannelPreview /> : <DirectPreview />}
		</div>
	);
};

export default TeamChannelPreview;
