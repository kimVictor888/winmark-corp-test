import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Grid,
	Skeleton,
	Typography,
} from '@mui/material';
import React from 'react';

const ImageCard = ({ image, deleteImage, handleOpenModal, isLoading }) => {
	const handleClick = () => {
		handleOpenModal(image.url);
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		deleteImage(image.id);
	};

	return (
		<Grid item key={image.id} xs={12} sm={6} md={3}>
			{isLoading ? (
				<Skeleton variant='rectangular' width='100%' height='300px' />
			) : (
				<Card
					onClick={handleClick}
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#f9f9f9',
					}}
				>
					<CardMedia
						component='img'
						image={image.thumbnailUrl}
						alt={image.title}
						height='150'
					/>
					<CardContent sx={{ flexGrow: 1 }}>
						<Typography>{image.title}</Typography>
					</CardContent>
					<CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							variant='contained'
							color='error'
							size='small'
							onClick={handleDelete}
						>
							Delete
						</Button>
					</CardActions>
				</Card>
			)}
		</Grid>
	);
};

export default ImageCard;
