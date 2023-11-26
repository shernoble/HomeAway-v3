// emailValidation.js

export const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
};

export const validPasswords=(newPassword,confirmPassword) => {


    const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;

        if (!(newPassword.length >= 8 && newPassword.length <= 24)) {
        return 'Password length should be between 8-24';
        }
    
        if (!passRegex.test(newPassword)) {
        return 'Password must contain minimum eight characters, at least one alphabet, one number, and one special character';
        }
    
        if (newPassword !== confirmPassword) {
        return "Password doesn't match";
        }
    
        return null; // Indicates that the form is valid
}



export const validRegisteration=(formvalues) => {

    const { email, phone, password, cpassword } = formvalues;

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
}

export const startingPageValidation=(values) => {

        console.log(values);
        // const errors={};
        console.log("numguests:"+values.guests);
        // const curr_date=new Date();
        // const curr_time=curr_date.getTime();
        // const start_time=new Date(values.fromDate).getTime();
        // const end_time=new Date(values.toDate).getTime();
        const num_guests=values.guests;

        // if(start_time<curr_time || end_time<curr_time || start_time>end_time){
        //     return 'invalid dates';
        // }
        // let num_days=(end_time-start_time)/(1000*60*60*24);
        
        // console.log("duration:"+num_days);
        if(num_guests>20){
            return 'max number of guests is 20';
        }
        // if(num_days>10){
        //     return 'duration of stay cannot be more than 10 days';
    
        // }
        // form is valid
        return null;
}

export const reserveValidation=(values) => {
    console.log(values);
    const curr_date=new Date();
        const curr_time=curr_date.getTime();
        const start_time=new Date(values.fromDate).getTime();
        const end_time=new Date(values.toDate).getTime();

        if(start_time<curr_time || end_time<curr_time || start_time>end_time){
            return 'invalid dates';
        }
        return null;
}