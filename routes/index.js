const express = require("express");
const router = express.Router();
const db = require("../db/index");
const controllerIndex = require("../controller/controller_index");
//const middlewareAuthentication = require("../middleware/middleware_authentication");

/* GET home page. */


router.get("/", controllerIndex.renderIndex);

router.get("/registration", controllerIndex.renderRegistration);

router.get("/dbtest", controllerIndex.testDB);

//router.post("/login", middlewareAuthentication.authenticate('local')); // FIXME: THE LOGIN IS RESTFUL

// router.get("/", (request, response) => {
//     db.any(
//         `INSERT INTO test_table ("testString") VALUES ('Hello at $
//    {Date.now()}')`
//     )
//         .then((_) => db.any(`SELECT * FROM test_table`))
//         .then((results) => response.json(results))
//         .catch((error) => {
//             console.log(error);
//             response.json({ error });
//         });
// });

module.exports = router;
