const { addPackageService, getAllPackagesService } = require("../services/packageService");

// add a new package
async function addPackageCtl(req,res,next) {
    const package = await addPackageService(req.body);
    
    if (package.error) {
        return res.status(422).json(package);
    }
    // change _x_,_y_ to number
    
    return res.status(200).json({success:true,data:package});
}

// get all packages 
async function getPackagesCtl(req,res,next) {
    const packages = await getAllPackagesService();
    
    if (!Array.isArray(packages)) {
        console.log("5000 co");
        return res.status(500).json(packages);
    }
    
    return res.status(200).json({success:true,error:{},data:packages});
}

module.exports = {
    addPackageCtl,
    getPackagesCtl,
}

