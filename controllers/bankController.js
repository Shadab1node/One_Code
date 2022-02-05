const Bank=require("../models/bankModel")

exports.addbank=async (req,res)=>{
    try{
		const accnumber=req.body.accnumber;
		const confirmaccnumber=req.body.confirmaccnumber;
    if(accnumber=== confirmaccnumber){
        const bank=new Bank()
        bank.accHolderName=req.body.accHolderName,
        bank.bankname=req.body.bankname,
        bank.accnumber=accnumber,
	    bank.confirmaccnumber=confirmaccnumber,
        bank.ifsccode=req.body.ifsccode
        bank.save()
        return res.status(200).json({msg:"bank add successfully",bank}) 
    }
        else{
        return res.status(400).json({msg:"account number not matched"})
    }   
        }
        catch(error){
        console.log(error)
        return res.status(400).json({msg:"something went wrong",error:error.message})
    }
}


exports.getbank=async (req,res)=>{
    try {
    const getbank=await Bank.find({})
    return res.status(200).json({msg:"get Bank Successfully",getbank})
    } catch (error) {
    console.log(error)
        return res.status(200).json({msg:"get Bank Successfully",getbank})
    }
}