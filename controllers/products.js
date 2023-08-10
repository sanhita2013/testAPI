const Product = require("../db/model/products")
const getAllProducts = async (req, res) => {
    const{company, name, featured, sort,select}=req.query;
    const queryObj={}
    //filter
    if(company){
        queryObj.company=company
    }
    if(featured){
        queryObj.featured=featured
    }
    if(name){
        queryObj.name={$regex:name, $options:"i"}
    }
    let ApiData=Product.find(queryObj);
    //data sort
    if(sort){
        const sortFix=sort.split(",").join(" ");
        ApiData=ApiData.sort(sortFix)
    }
    //select column
    if(select){        
        const selectFix=select.split(",").join(" ");
        ApiData=ApiData.select(selectFix)
    }

    //pagination
    let page=Number(req.query.page) || 1;
    let limit=Number(req.query.limit) || 2;
    let showdataperpage = (page-1)*limit;
    ApiData= ApiData.skip(showdataperpage).limit(limit);

    const myProductData = await ApiData;
    res.status(200).json({ myProductData,nbHits:myProductData.length })

}
const getAllProductsTesting = async (req, res) => {
    res.status(200).json({ msg: "I am getAllProductsTesting" })

}
module.exports = { getAllProducts, getAllProductsTesting }