import { useState } from 'react';
import SignupForm from './components/SignupForm';
import Snackbar from './components/Snackbar';
import DefaultLayout from '@/components/Layouts/DefaultLayout';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useJobPositions } from '@/hook/useJobPositions';
import LoadingBackdrop from '@/components/LoadingBackdrop';

const SignUpContainer = styled(Stack)(({ theme }) => ({
	minHeight: '100%',
	padding: theme.spacing(2),
	[theme.breakpoints.up('sm')]: {
		padding: theme.spacing(4),
	},
}));

const Card = styled(MuiCard)(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignSelf: 'center',
	width: '100%',
	padding: theme.spacing(4),
	gap: theme.spacing(2),
	margin: 'auto',
	boxShadow:
		'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
	[theme.breakpoints.up('sm')]: {
		width: '450px',
	},
}));

const Signup = () => {
	const [snackbar, setSnackbar] = useState({
		open: false,
		message: '',
		severity: 'success' as 'success' | 'error',
	});

	const handleSnackbarClose = () => setSnackbar(prev => ({ ...prev, open: false }));

	const { isLoading: isLoadingJobPositions } = useJobPositions();

	return (
		<DefaultLayout>
			{isLoadingJobPositions
				? <LoadingBackdrop />
				:
				<SignUpContainer direction="column" justifyContent="space-between">
					<Card variant="outlined">
						<Typography component="h1" variant="h4" sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)', textAlign: 'center' }}>
							Sign up
						</Typography>

						<SignupForm setSnackbar={setSnackbar} />
					</Card>
				</SignUpContainer>
			}

			<Snackbar snackbar={snackbar} onClose={handleSnackbarClose} />
		</DefaultLayout>
	);
};

export default Signup;

