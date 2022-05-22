import { Box, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import ImageForm from "../components/ImageForm";
import ImageListComponent from "../components/ImageListComponent";
import ResultComponent from "../components/ResultComponent";
import { useSelector } from "react-redux";
import LoadingComponent from "../components/Skeletons/LoadinComponent";

const HomePage = () => {
	const { isAuthenticated } = useSelector((state) => state.authState);
	const { file } = useSelector((state) => state.fileState);
	const { isGenerated, result, loading, error } = useSelector(
		(state) => state.resultState
	);

	return (
		<>
			<Box
				sx={{
					height: "600px",
					backgroundImage: `url(${
						process.env.PUBLIC_URL + "/assets/coverImage.jpg"
					})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
					"&:before": {
						content: '""',
						position: "absolute",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(0,0,0,0.3)"
					}
				}}
			>
				<ImageForm />
			</Box>
			<Box sx={{ mt: 4 }}>
				{isAuthenticated && file ? (
					loading ? (
						<LoadingComponent />
					) : error ? (
						<Typography variant="h5" color="error">
							{error}
						</Typography>
					) : isGenerated ? (
						<Container>
							<ResultComponent />
						</Container>
					) : (
						<></>
					)
				) : (
					<></>
				)}  
			</Box>

			<Box sx={{ mt: 4 }}>
				<Container>
					<Typography variant="h4" fontWeight="bold">
						Sample Images
					</Typography>
					<ImageListComponent />
				</Container>
			</Box>
		</>
	);
};

export default HomePage;
