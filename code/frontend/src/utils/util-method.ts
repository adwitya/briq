// GET CURRENCY
export const getCurrency=(country:string)=> {
    let currency:string = "";
    switch(country) {
        case "IN" :
            currency = "₹";
            break;
        
        case "EU" :
            currency = "€";
            break;
        
        case "UK" :
            currency = "£";
            break;
        
        case "JP" :
            currency = "¥";
            break;
        
        default:
            currency = "$"
    }
    return currency;
}