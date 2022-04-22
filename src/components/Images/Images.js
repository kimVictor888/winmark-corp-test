import { Container, Grid, Pagination } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import ImageCard from './ImageCard/ImageCard';
import Filter from './Filter';
import ImageModal from './ImageModal';

const Images = () => {
	const [images, setImages] = useState([]);
	const [total, setTotal] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [limit] = useState(12);
	const [albumsIds, setAlbumsIds] = useState([]);
	const [currentAlbumId, setCurrentAlbumId] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [modalImage, setModalImage] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const getImages = useCallback(async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`http://jsonplaceholder.typicode.com/photos`,
				{
					params: {
						_page: currentPage,
						_limit: limit,
						albumId: currentAlbumId || null,
					},
				}
			);

			setImages(response.data);
			setTotal(Math.round(response.headers['x-total-count'] / limit));
			setIsLoading(false);
		} catch (err) {
			console.log(err);
		}
	}, [currentPage, limit, currentAlbumId]);

	const getAlbums = useCallback(async () => {
		try {
			const { data } = await axios.get(
				'http://jsonplaceholder.typicode.com/albums'
			);
			setAlbumsIds(data.map((album) => album.id));
		} catch (err) {
			console.log(err);
		}
	}, []);

	const deleteImage = useCallback(
		async (id) => {
			try {
				await axios.delete(`http://jsonplaceholder.typicode.com/photos/${id}`);
				setImages(images.filter((image) => image.id !== id));
			} catch (err) {
				console.log(err);
			}
		},
		[images]
	);

	useEffect(() => {
		getAlbums();
		getImages();
	}, [getImages, getAlbums]);

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [currentPage]);

	const handleChangeAlbumId = useCallback((value) => {
		setCurrentAlbumId(value);
		setCurrentPage(1);
	}, []);

	const handleOpenModal = useCallback((url) => {
		setModalImage(url);
		setIsOpen(true);
	}, []);

	const handleCloseModal = () => {
		setModalImage('');
		setIsOpen(false);
	};

	return (
		<Container
			sx={{
				py: 4,
				display: 'flex',
				flexDirection: 'column',
				gap: '48px',
				alignItems: 'center',
			}}
			maxWidth='md'
		>
			<Filter
				albumsIds={albumsIds}
				currentAlbumId={currentAlbumId}
				handleChangeAlbumId={handleChangeAlbumId}
			/>
			<Grid container spacing={4}>
				{images.map((image) => (
					<ImageCard
						key={image.id}
						image={image}
						deleteImage={deleteImage}
						handleOpenModal={handleOpenModal}
						isLoading={isLoading}
					/>
				))}
			</Grid>
			<Pagination
				page={currentPage}
				count={total}
				color='primary'
				sx={{ display: 'flex', justifyContent: 'center' }}
				onChange={(_, page) => setCurrentPage(page)}
			/>
			<ImageModal
				modalImage={modalImage}
				isOpen={isOpen}
				handleOpenModal={handleOpenModal}
				handleCloseModal={handleCloseModal}
			/>
		</Container>
	);
};

export default Images;
