import React from "react";

import { ChannelList, useChatContext } from "stream-chat-react";
import { CiHospital1, CiLogout } from "react-icons/ci";
const cookies = new Cookies();

import Cookies from "universal-cookie";
import ChannelSearch from "./ChannelSearch";
import TeamChannelList from "./TeamChannelList";
import TeamChannelPreview from "./TeamChannelPreview";
import { useSelector } from "react-redux";

type Props = {};

const SideBar = ({ logout }: any) => (
	<div className="channel-list__sidebar">
		<div className="channel-list__sidebar__icon1 bg-emerald-900">
			<div className="icon1__inner text-3xl bg-white text-black rounded-full p-2">
				{/* <img src="" alt="Hospital" width={30} /> */}
				<CiHospital1 width={30} />
			</div>
		</div>
		<div className="channel-list__sidebar__icon2">
			<div
				onClick={logout}
				className="icon1__inner text-3xl bg-white text-black rounded-full p-2">
				{/* <img src="" alt="Logout" width={30} /> */}
				<CiLogout width={30} />
			</div>
		</div>
	</div>
);

const CompanyHeader = () => (
	<div className="channel-list__header bg-emerald-800 flex items-center">
		<p className="channel-list__header__text">Medical Pager</p>
	</div>
);

const ChannelListContainer = (props: Props) => {
	const { isCreating, isEditing } = useSelector((store: any) => store.app);
	const logout = () => {
		cookies.remove("token");

		cookies.remove("userId");
		cookies.remove("username");
		cookies.remove("fullName");
		cookies.remove("avatarURL");
		cookies.remove("hashedPassword");
		cookies.remove("phoneNumber");

		window.location.reload();
	};
	return (
		<>
			<SideBar logout={logout} />
			<div className="channel-list__list__wrapper bg-emerald-800">
				<CompanyHeader />
				<ChannelSearch />
				<ChannelList
					filters={{}}
					// channelRenderFilterFn={() => {}}
					List={(listProps: any) => (
						<TeamChannelList
							{...listProps}
							type="team"
							Preview={(previewProps: any) => (
								<TeamChannelPreview {...previewProps} type="team" />
							)}
						/>
					)}
				/>
				<ChannelList
					filters={{}}
					// channelRenderFilterFn={() => {}}
					List={(listProps: any) => (
						<TeamChannelList
							{...listProps}
							type="messaging"
							Preview={(previewProps: any) => (
								<TeamChannelPreview {...previewProps} type="messaging" />
							)}
						/>
					)}
				/>
			</div>
		</>
	);
};

export default ChannelListContainer;
