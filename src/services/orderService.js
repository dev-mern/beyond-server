const { PlanOrdersModel } = require("../models/planOrdersModel");
const { errorFormatter } = require("../utils/formatter");


// add a new package
async function addOrderService(order) {
    // console.log(order);
    try {
        const OrderBson = new PlanOrdersModel(order);
        const newOrder = await OrderBson.save();
        return newOrder;
    } catch (error) {
        console.log(error);
        const formatedErr = errorFormatter(error);
        return {success:false,error:true,message: formatedErr}
    }
}


module.exports = {
    addOrderService,

}
