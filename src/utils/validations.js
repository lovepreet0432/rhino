import * as Yup from "yup";

export const ManuallyEnterItemSchema = Yup.object().shape({
  identifier: Yup.number()
  .typeError("Identifier must be a number")
  .positive("Must be a positive number")
  .integer("Must be an integer")
  .min(10000, "Must have at least 5 digits")
  .max(999999999999999999999999999999, "Can have at most 30 digits")
  .required("Identifier is required"),
  title: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Title must contain only letters")
    .min(5, "Must have at least 5 characters")
    .max(50, "Can have at most 50 characters")
    .required("Title is required"),
  price: Yup.number()
    .required("Price is required")
    .typeError("Invalid price")
    .test('non-zero', 'Price must be greater than 0.', value => value > 0)
    .max(100000, "Should not be greater than 10000"),
  description: Yup.string()
    .min(20, "Must have at least 20 characters")
    .max(250, "Can have at most 250 characters")
    .required("Description is required"),
  quantity: Yup.number()
    .typeError("Invalid quantity")
    .integer("Must be an integer")
    .min(1, "Must be at least 1")
    .max(100, "Must be at most 100")
    .required("Quantity is required"),
});

export const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  _error: Yup.string(),
});

export const RegistrationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, "Name must contain only letters")
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name can be at most 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .matches(/^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,4}$/, 'Invalid email address')
    .required("Please enter your email address"),  
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/\d/, "Password must contain a digit")
    .matches(/[a-z]/, "Password must contain a lowercase letter")
    .matches(/[A-Z]/, "Password must contain an uppercase letter")
    .matches(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      "Password must contain a special character"
    )
    .max(50, "Password can be at most 50 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords do not match")
    .required("Confirm Password is required"),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const ProfileValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Full name must contain only letters")
    .max(50, "Full Name should not exceed 50 characters")
    .required("Full Name is required"),
  company: Yup.string()
    .max(100, "Company should not exceed 100 characters")
    .nullable(),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  street: Yup.string()
    .max(100, "Street should not exceed 100 characters")
    .required("Street is required"),
  street_two: Yup.string().max(
    100,
    "Street 2 should not exceed 100 characters"
  ),
  city: Yup.string()
    .matches(/^[A-Za-z ]+$/, "City must contain only letters")
    .required("City is required"),
  zipcode: Yup.string()
  .matches(/^[A-Za-z\d]{3}\s?[A-Za-z\d]{0,3}$/, "Invalid ZIP code")
  .required("Zipcode is required"),  
});

export const PaymentValidationSchema = Yup.object().shape({
 state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
  street: Yup.string()
    .max(100, "Street should not exceed 100 characters")
    .required("Street is required"),
  city: Yup.string()
    .matches(/^[A-Za-z ]+$/, "City must contain only letters")
    .required("City is required"),
  zipcode: Yup.string()
  .matches(/^[A-Za-z\d]{3}\s?[A-Za-z\d]{0,3}$/, "Invalid ZIP code")
  .required("Zipcode is required"),  
});


export const ChangePasswordValidationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/,
      "Password must contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required("Confirm New Password is required")
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
});

export const PaymentSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("First Name is required")
    .matches(/^[A-Za-z ]+$/, "First Name is invalid")
    .max(15, "First Name should not exceed 15 characters"),
  street_one: Yup.string()
    .required("Street Address is required")
    .max(50, "Street Address should not exceed 50 characters"),
  street_two: Yup.string().max(
    50,
    "Street Address 2 should not exceed 50 characters"
  ),
  zipcode: Yup.string()
    .required("Zip is required")
    .matches(/^[A-Z\d]{3,9}$/, "Zip should be between 3 and 9 characters")
    .min(3, "Zip should be at least 3 characters")
    .max(9, "Zip should not exceed 9 characters"),
  state: Yup.string().required("State is required"),
  country: Yup.string().required("Country is required"),
});

export const ResetPasswordValidationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/, 'Password must contain at least one special character')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const EditScanHistorySchema = Yup.object().shape({
  identifier: Yup.string().required('Identifier is required.'),
  title: Yup.string().required('Title is required.'),
    price: Yup.number()
    .required('Price is required')
    .typeError('Price must be a valid number.')
    .test('non-zero', 'Price must be greater than 0.', value => value > 0)
    .max(10000, 'Price should be at most 10000'),
    quantity: Yup.number()
    .typeError('Quantity must be a valid number.')
    .required('Quantity is required.')
    .positive('Quantity must be greater than 0.'),
});

export const contactFormValidationSchema = Yup.object().shape({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, 'Invalid characters')
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name can be at most 50 characters")
    .required('Name is required'),
  company: Yup.string()
  .max(100, "Street should not exceed 100 characters")
  .required('Company is required'),
  description: Yup.string()
    .max(500, 'Comment must not exceed 500 characters')
    .required('Comment is required'),
});

export const shopifyValidationSchema = Yup.object().shape({
  shopify_url: Yup.string().required("Shopify Url is required"),
  access_token: Yup.string().required("Access Token is required"),
});


// export const hibidValidationSchema = Yup.object({

//   seller: Yup.string().when('hibid', {
//     is: 'enable',
//     then: Yup.string().required('Seller is required'),
//     otherwise: Yup.string(),
//   }),
//   sellerCode: Yup.string().when('hibid', {
//     is: 'enable',
//     then: Yup.string().required('Seller Code is required'),
//     otherwise: Yup.string(),
//   }),
// });


export const EditScanHistoryValidationSchema = Yup.object().shape({
  identifier: Yup.string().required('Identifier is required'),
  title: Yup.string().required('Title is required'),
  quantity: Yup.number().required('Quantity is required').min(0, 'Quantity should be at least 0').max(100, 'Quantity should be at most 100'),
  price: Yup.number().required('Price is required').min(0, 'Price should be at least 0').max(1000, 'Price should be at most 1000'),
});


export const hibidValidationSchema = Yup.object({
  seller: Yup.string().required('Seller is required'),
  sellerCode: Yup.string().required('Seller Code is required'),
});


export const adminHomePageSchema = Yup.object().shape({
  heading: Yup.string().required('Heading is required'),
  content: Yup.string().required('Content is required'),
  scanContent: Yup.string().required('Scan Content is required'),
  services: Yup.array().of(
    Yup.object().shape({
      servicesHeading: Yup.string().required('Service Heading is required'),
      servicesContent: Yup.string().required('Service Content is required'),
    })
  ),
  featureContent: Yup.string().required('Video Content is required'),
  shopify: Yup.array().of(Yup.string().required('Shopify Feature is required')),
  ebay: Yup.array().of(Yup.string().required('Ebay Feature is required')),
  hibid: Yup.array().of(Yup.string().required('Hibid Feature is required')),
  amazon: Yup.array().of(Yup.string().required('Amazon Feature is required')),
  whatnot: Yup.array().of(Yup.string().required('Whatnot Feature is required')),
});
