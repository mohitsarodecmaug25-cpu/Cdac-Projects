import * as yup from 'yup';

export const athleteSchema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup.number().required('Age is required').min(10, 'Age must be at least 10').max(50, 'Age must be less than 50'),
  gender: yup.string().required('Gender is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});

export const coachSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  experience: yup.number().required('Experience is required').min(1, 'Experience must be at least 1 year'),
  sport_id: yup.string().required('Sport selection is required')
});

export const adminSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
});