const express = require('express');
const router = express.Router();
const { purchase_ticket ,cancel_ticket,see_attende} = require("../controller/tkt_book_c");


router.route("/see_attende/:evnt_id").get(see_attende);
router.route("/purchase_ticket").post(purchase_ticket);
router.route("/cancel_ticket/:ticket_id").put(cancel_ticket);

module.exports = router;
