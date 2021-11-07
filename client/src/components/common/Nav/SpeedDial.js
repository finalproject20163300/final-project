import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import FileCopyIcon from "@material-ui/icons/FileCopyOutlined";
import SaveIcon from "@material-ui/icons/Save";
import PrintIcon from "@material-ui/icons/Print";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EditIcon from "@material-ui/icons/Edit";
import AppsIcon from "@material-ui/icons/Apps";
import AlbumIcon from "@material-ui/icons/Album";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@material-ui/core";

import sondia_adult from "source/mp3/Adult.mp3";

const useStyles = makeStyles((theme) => ({
	speedDial: {
		bottom: theme.spacing(2),
		left: theme.spacing(2),
	},
}));

const actions = {
	items: [
		{ icon: <AlbumIcon />, name: "Music", action: "" },
		{ icon: <AppsIcon />, name: "Nav", action: "" },
		{ icon: <FileCopyIcon />, name: "Copy", action: "" },
		{ icon: <SaveIcon />, name: "Save", action: "" },
		{ icon: <PrintIcon />, name: "Print", action: "" },
		{ icon: <ShareIcon />, name: "Share", action: "" },
		{ icon: <FavoriteIcon />, name: "Like", action: "" },
	],
};

function SpeedD() {
	const history = useHistory();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [hidden, setHidden] = useState(false);
	const [dialogOpen, setdialogOpen] = useState(false);
	const [MusicOpen, setMusicOpen] = useState(true);

	function free() {
		// 초기화 함수 :: 아직 미해결
		const music = document.getElementById("Audio");
		if (music) {
			music.volume = 0.1;
		}
	}

	const dialogClickOpen = () => {
		setdialogOpen(true);
	};

	const dialogClose = () => {
		setdialogOpen(false);
	};
	const MusicWindow = () => {
		setMusicOpen(!MusicOpen);
		const music = document.getElementById("Audio");
		if (MusicOpen === true) {
			music.style.visibility = "visible";
			music.style.bottom = "0"; //-5.4
		} else {
			music.style.bottom = "-5.5rem"; //-5.4

			// music.style.marginTop = "25rem";
			music.style.visibility = "hidden";
		}
	};

	function handleClick(e, name) {
		e.preventDefault();
		switch (name) {
			case "Copy":
				break;
			case "Music":
				// dialogClickOpen();
				// showMusic();
				MusicWindow();
				break;
			case "Nav":
				history.push("/");
				break;
			case "Print":
				break;
			// const props = prop.props;
			// props.history.push('/');

			default:
				alert(name);
		}
		setOpen(!open); // to close the speed dial, remove this line if not needed.
	}

	const handleVisibility = () => {
		setHidden((prevHidden) => !prevHidden);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	return (
		<>
			{/* 버튼 숨기기 버튼 */}
			{/* <Button onClick={handleVisibility}>Hide Button  </Button> */}
			<SpeedDial
				ariaLabel="SpeedDial openIcon"
				className={classes.speedDial}
				id="FloatingButton"
				hidden={hidden}
				icon={<SpeedDialIcon openIcon={<EditIcon />} />}
				onClose={handleClose}
				onOpen={handleOpen}
				open={open}
			>
				{/* map 이용법 참고 */}
				{actions.items.map((action) => (
					<SpeedDialAction
						key={action.name}
						icon={action.icon}
						tooltipTitle={action.name}
						onClick={(e) => {
							handleClick(e, action.name);
						}}
					/>
				))}
			</SpeedDial>
			<audio id="Audio" controls loop>
				<source src={sondia_adult} />
			</audio>
			{free()}
			
		</>
	);
}

export default React.memo(SpeedD);
