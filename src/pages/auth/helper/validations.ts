import * as Yup from 'yup';

export const signupValidationSchema = Yup.object().shape({
	first_name: Yup.string().required('First name is required'),
	last_name: Yup.string().required('Last name is required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: Yup.string()
		.min(6, 'Password must be at least 6 characters')
		.required('Password is required'),
	confirm_password: Yup.string()
		.oneOf([Yup.ref('password'), null], 'Passwords must match')
		.required('Confirm password is required'),
	role: Yup.string().required('Role is required'),
	job_position: Yup.string().required('Job position is required'),
})

export const signinValidationSchema = Yup.object({
	email: Yup.string().email('Invalid email address').required('Email is required'),
	password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});