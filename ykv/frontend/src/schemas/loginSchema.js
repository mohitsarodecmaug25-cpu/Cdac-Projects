import * as yup from 'yup';

export const loginSchema = yup.object({
  phone: yup.string().matches(/^\d{10}$/, 'Phone must be 10 digits').required('Phone is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  role: yup.string().required('Role is required')
});