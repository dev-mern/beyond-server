const { addPackageService } = require("../services/packageService");


async function addPackageCtl(req,res,next) {
    const package = await addPackageService(req.body);
    
    if (package.error) {
        return res.status(422).json(package);
    }
    // change _x_,_y_ to number
    
    return res.status(200).json({success:true,data:package});
}

module.exports = {
    addPackageCtl,
}

