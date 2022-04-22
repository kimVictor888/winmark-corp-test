import { Box, Card, CardMedia, Modal } from '@mui/material';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	boxShadow: 24,
};

const ImageModal = ({ isOpen, handleCloseModal, modalImage }) => {
	return (
		<Modal
			open={isOpen}
			onClose={handleCloseModal}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'
		>
			<Box sx={style}>
				<Card
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						backgroundColor: '#f9f9f9',
					}}
				>
					<CardMedia component='img' image={modalImage} alt='image' />
				</Card>
			</Box>
		</Modal>
	);
};

export default ImageModal;
