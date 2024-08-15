const express = require('express');
const router = express.Router();
const { create,search_by_name, search_by_loc,search_by_date,search_by_category,all_Events,update_event_by_id,delete_evnt_by_id} = require("../controller/C_event");
const ValidateToken = require("../middleware/validateTok");

router.route("/Event/create").post(ValidateToken,create);//admin token frm login

//event discovery user/admin 
router.route("/Event/all_Events").get(all_Events);
router.route("/Event/search_by_name/:title").get(search_by_name);
router.route("/Event/search_by_loc/:location").get(search_by_loc);
router.route("/Event/search_by_date/:start_datetime").get(search_by_date);
router.route("/Event/search_by_category/:category").get(search_by_category);//evnt type


//event dashboard user
router.route("/Event/all_Events").get(all_Events);
router.route("/Event/update_event_by_id/:evnt_id").put(update_event_by_id);//admin token frm login
router.route("/Event/delete_evnt_by_id/:evnt_id").delete(ValidateToken,delete_evnt_by_id);//admin token frm login



module.exports = router;
