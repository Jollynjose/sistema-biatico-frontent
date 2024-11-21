import { Snackbar, Alert } from '@mui/material';

interface SnackbarProps {
  snackbar: { open: boolean; message: string; severity: 'success' | 'error' };
  onClose: () => void;
}

const SnackbarComponent: React.FC<SnackbarProps> = ({ snackbar, onClose }) => (
  <Snackbar
    open={snackbar.open}
    autoHideDuration={6000}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert onClose={onClose} severity={snackbar.severity} sx={{ width: '100%' }}>
      {snackbar.message}
    </Alert>
  </Snackbar>
);

export default SnackbarComponent;
