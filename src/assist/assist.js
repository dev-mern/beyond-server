const user = {
    _id:"",
    fname:"",
    lname:"",
    email:"",
    mobile:"",
    password:"",
    referral_id:"",
    joiner_Referer:""
}

const refer = {
    id:"",
    referrer_id:"",
    joiner_id:"",
    earn: 250, // $250
}

const company = {
    id:"",
    user_id:"",
    name:"",
    email:"",
    phone:"",
    ein:"",
    type:"",
    sell:"",
    established:"",
    address:{
        address_1:"",
        address_2:"",
        city:"",
        state:"",
        zip_code:"",
        country:""
    },
}

const plan = {
    id:"",
    name:"",
    price: 0,
    period:"month",
    book_limit:50,
    book_unit:"K",  // K,M,B
    facilites:{
        list:["weekly bookkeeping","up to _x_ bank/credit card", "_y_ integration"],
        bank_limit: 4,
        integration_limit: 2,
    },

}

const card: {
    number:"credit_card_number",
    exp:"",
    cvc:"",
    zip:"",
}

const data_response = {
    success: true,
    data:{},
    error:{
        message:{
            common:"general message",
            email:"email error",
            password:"password error"
        },
    }
}