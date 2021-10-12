const Staff = require('../models/staffModel')

exports.get_home = (req, res) => {
	res.render('home', {title:'home'});
};
exports.get_admin = (req, res) => {
	res.render('admin', {title:'admin'});
};

//! staff controller
exports.get_add_staff = (req, res) => {
	res.render('add-staff', {title:'add-staff'});
};

exports.post_add_staff = async (req,res) =>{
    try{
        const newStaff = new Staff({
					firstName: req.body.firstName,
					surName: req.body.surName,
					email: req.body.email,
					address: req.body.address,
					staffNumber: req.body.staffNumber,
					department: req.body.department,
					password: req.body.password,
				});
           let staff = await newStaff.save()
           res.send(staff)
           console.log(staff);
    }
    catch(err){
        console.log(err)
    }
}

exports.get_staffs = async (req,res) =>{
    try{
        const staffs = await Staff.find()
        res.render('staffs', {staffs, title:'staffs'})
    }
    catch(err){
        console.log(err)
    }
}
exports.delete = async(req,res) =>{
    try{
        await Staff.findByIdAndDelete(req.params.id)
        res.redirect('/view-staffs')
    }catch(err){
        console.log(err)
    }
}

//! log in controller
exports.get_log_in = (req,res) =>{
    res.render('log-in', {title:'log-in'})
}
exports.post_log_in = async (req,res) =>{
    try{
        let email = await Staff.findOne({email:req.body.email})
        let pwd = await Staff.findOne({password:req.body.password})
        if(email && pwd){
            res.redirect(`staff-page/${email.id}`)
        }else{
            res.send('wrong email or password')
        }
    }catch(err){
        res.render('log-in')
        console.log(err)
    }   
}
exports.get_staff_page =async (req,res) =>{
    try{
        let staff = await Staff.findById(req.params.id)
        res.render('staff-page', {staff, title:staff.firstName})
    }catch(err){

    }
}