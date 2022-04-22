import { AppBar, Box, Toolbar, Typography } from '@mui/material';

const Header = () => {
	return (
		<Box>
			<AppBar position='static'>
				<Toolbar sx={{ justifyContent: 'center' }}>
					<Typography variant='h6' component='div'>
						Photos
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Header;
