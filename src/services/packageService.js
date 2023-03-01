const { PackageModel } = require("../models/packageModel");
const { errorFormatter } = require("../utils/formatter");


// add a new package
async function addPackageService(package) {
    // console.log(package);
    try {
        const PackageBson = new PackageModel(package);
        const newPackage = await PackageBson.save();
        return newPackage;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}

// add a new package
async function getAllPackagesService(package) {
    // console.log(package);
    try {
        const packages = await PackageModel.find({});
        return packages;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error: formatedErr}
    }
}


module.exports = {
    addPackageService,
    getAllPackagesService,
}
