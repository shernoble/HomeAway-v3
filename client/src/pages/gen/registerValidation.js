// formValidations.js

export const isFormValid = (formValues) => {
    const { email, phone, password, cpassword } = formValues;
    
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        const phoneRegex = /^\d{10}$/;
        const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    
        if (!emailRegex.test(email)) {
        return 'Invalid email address';
        }
    
        if (!phoneRegex.test(phone)) {
            // console.log(phone);
        return 'Invalid phone number';
        }
    
        if (!(password.length >= 8 && password.length <= 24)) {
        return 'Password length should be between 8-24';
        }
    
        if (!passRegex.test(password)) {
        return 'Password must contain minimum eight characters, at least one alphabet, one number, and one special character';
        }
    
        if (password !== cpassword) {
        return "Password doesn't match";
        }
    
        return null; // Indicates that the form is valid
    };
