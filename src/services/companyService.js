const { CompanyModel } = require("../models/companyModel");
const { errorFormatter } = require("../utils/formatter");

// add a new company
async function addCompanyService(company) {
    try {
        const CompanyBSON = new CompanyModel(company);
        const newCompany = await CompanyBSON.save();
        return newCompany;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,data:{},error: formatedErr}
    }
}

// check if company exist 
async function checkCompanyExist(filter={}) {
    try {
        const isCompanyExist = await CompanyModel.exists({...filter});
        return isCompanyExist;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

// find companies 
async function getCompanies(filter={}) {
    try {
        const companies = await CompanyModel.find({...filter});
        return companies;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}

module.exports = {
    addCompanyService,
    checkCompanyExist,
    getCompanies,
}