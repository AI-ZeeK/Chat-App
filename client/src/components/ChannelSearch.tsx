import React from "react";
import { CiSearch } from "react-icons/ci";
import { getChannel, useChatContext } from "stream-chat-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setData, setLoading } from "../Features/AppSlice";
type Props = {};

const ChannelSearch = (props: Props) => {
	const { data } = useSelector((store: any) => store.app);
	const dispatch = useDispatch();

	const getChannels = async (e: any) => {
		try {
			// TODO: fetch Channels
		} catch (error) {
			dispatch(setData(""));
		}
	};
	const onSearch = (e: any) => {
		e.preventDefault();
		dispatch(setLoading());
		dispatch(setData(e.target.value));
		getChannels(e.target.value);
	};
	return (
		<div className="channel-search__container">
			<div className="channel-search__input__wrapper">
				<div className="channel-search__input__icon">
					<CiSearch />
				</div>
				<input
					type="text"
					placeholder="Search"
					className="channel-search__input__text"
					value={data}
					onChange={onSearch}
				/>
			</div>
		</div>
	);
};

export default ChannelSearch;
