const Staff = require('../models/staffModel')
const Attendance = require('../models/attendaceModel')

exports.get_home = (req, res) => {
	res.render('home', {title:'home'});
};
exports.get_admin = (req, res) => {
    	const reject = () => {
				res.setHeader('www-authenticate', 'Basic');
				res.sendStatus(401);
			};
			const authorization = req.headers.authorization;
			if (!authorization) {
				return reject();
			}
			const [username, password] = Buffer.from(
				authorization.replace('Basic', ''),
				'base64'
			)
				.toString()
				.split(':');
			if (!(username == 'project-group' && password === 'project-group')) {
				return reject();
			}
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
           res.redirect('/view-staffs')
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


exports.post_attendance = async (req,res) =>{

    let attendance = new Attendance({
        name:req.body.name,
        date: req.body.date,
        course: req.body.course,
        department: req.body.department,
    })
    try{
        await attendance.save()
        res.render('successful', {title:'successful'})
    }catch(err){
        console.log(err)
    }
    
}

exports.get_attendance = async (req,res) =>{
    try{
        let records = await Attendance.find();
        res.render('records', {records, title:'records'})
    }catch(err){
        console.log(err)
    }
}

exports.delete_record = async (req,res) =>{
    try{
        await Attendance.findByIdAndDelete(req.params.id)
         res.redirect('/view-attendance')      
    }catch(err){
        console.log(err)
    }
}