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

export const parseJwt = (token:any) => {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};