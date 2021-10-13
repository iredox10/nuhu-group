const express = require('express');
const route = express.Router()
const controller = require('../controller/controller')


route.get('/', controller.get_home)
route.get('/admin',controller.get_admin )

//! staff route 
route.delete('/delete/:id', controller.delete)
route.get('/add-staff',controller.get_add_staff )
route.post('/add-staff',controller.post_add_staff )
route.get('/view-staffs', controller.get_staffs)

route.get('/log-in', controller.get_log_in)
route.post('/log-in', controller.post_log_in)

route.get('/staff-page/:id', controller.get_staff_page)

//! attendance route 
route.post('/attendance', controller.post_attendance)
route.get('/view-attendance', controller.get_attendance)
route.delete('/delete-record/:id', controller.delete_record)
module.exports = route