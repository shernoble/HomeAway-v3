export const startingPageValidation=(values) => {
    const errors={};
        console.log("numguests:"+values.numguests);
        const curr_date=new Date();
        const curr_time=curr_date.getTime();
        const start_time=new Date(values.fromDate).getTime();
        const end_time=new Date(values.toDate).getTime();
        const num_guests=values.numguests;

        if(start_time<curr_time || end_time<curr_time || start_time>end_time){
            errors.dates='invalid dates';
        }
        let num_days=(end_time-start_time)/(1000*60*60*24);
        
        console.log("duration:"+num_days);
        if(num_guests>20){
            errors.numguests='max number of guests is 20';
        }
        if(num_days>10){
            errors.dates='duration of stay cannot be more than 10 days';
    
        }
        return errors;
}