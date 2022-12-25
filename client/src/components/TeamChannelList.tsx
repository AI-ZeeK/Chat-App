import React from "react";
type NewProps = {
	children: any;
	error: boolean;
	loading: any;
	type: any;
};

const TeamChannelList = ({
	children,
	error = false,
	loading,
	type,
}: NewProps) => {
	if (error) {
		return type === "team" ? (
			<div className="team-channel-list">
				<p className="team-channel-list__message">
					Connection error, Please Wait for a moment and try again
				</p>
			</div>
		) : null;
	}

	if (loading) {
		return (
			<div className="team-channel-list">
				<p className="team-channel-list__message loading">
					{type === "team" ? "Channels" : "Messages"} loading
				</p>
			</div>
		);
	}
	return (
		<div className="team-channel-list">
			<div className="team-channel-list__header">
				<p className="team-channel-list__header__title">
					{type === "team" ? "Channels" : "Messages"} loading
				</p>
				{/* Button - add channel */}
			</div>
			{children}
		</div>
	);
};

export default TeamChannelList;
