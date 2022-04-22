import {
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
} from '@mui/material';
import { Box } from '@mui/system';
import { memo } from 'react';

const Filter = memo(
	({ albumsIds, currentAlbumId, handleChangeAlbumId }) => {
		const handleChange = (e) => {
			handleChangeAlbumId(e.target.value);
		};

		const handleClear = () => {
			handleChangeAlbumId('');
		};

		return (
			<Box sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
				<FormControl sx={{ minWidth: 120 }} size='small'>
					<InputLabel id='demo-simple-select-label'>Album ID</InputLabel>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={currentAlbumId}
						label='Album ID'
						onChange={handleChange}
					>
						{albumsIds.map((id) => (
							<MenuItem key={id} value={id}>
								{id}
							</MenuItem>
						))}
					</Select>
				</FormControl>
				<Button variant='contained' size='medium' onClick={handleClear}>
					Clear filter
				</Button>
			</Box>
		);
	},
	(prevProps, nextProps) => {
		if (
			prevProps.albumsIds.length === nextProps.albumsIds.length &&
			prevProps.currentAlbumId === nextProps.currentAlbumId
		) {
			return true;
		}

		return false;
	}
);

export default Filter;
