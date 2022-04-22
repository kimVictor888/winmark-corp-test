import { CssBaseline } from '@mui/material';
import Images from './components/Images';
import Layout from './pages/Layout';

const App = () => {
	return (
		<>
			<CssBaseline />
			<Layout>
				<Images />
			</Layout>
		</>
	);
};

export default App;
