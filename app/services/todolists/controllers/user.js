const User = require('../models/user')

function get(req, res, next) {
    // const data = await User.find({}, (req, res, next) => {
    // })
    User.find().populate('user_assignment').exec((err, call) => {
    }).then((re)=>{
        res.status(200).json(re)
    })
  
}
function createAndGetById(req, res, next) {
    if (req.body._id == undefined && req.body.id == undefined) {
        User.create(req.body, function (err, call) {
            if (err) {
                res.status(200).json({ status: false })
                return next(err)
            } else {
                // console.log(call)
                res.status(200).json({ status: true, id: call._id })
            }

        })
    } else if (req.body._id || req.body.id) {
        // console.log(req.body._id, req.body.id)
        let tmpId
        if (req.body._id) {
            tmpId = req.body._id
        } else {
            tmpId = req.body.id
        }
         User.findById(tmpId).populate('user_assignment').exec((err, call) => {
            if (err) {
                res.json({ status: false })
            } else {
                res.json(call)
            }
        })
        // await User.findById(tmpId, (err, call) => {
        //     if (err) {
        //         res.json({ status: false })
        //     } else {
        //         res.json(call)
        //     }
        // });

        // res.status(200).json({ status: "ok" })
    } else {
        res.status(200).json({ status: false })
    }


}
function update(req, res, next) {
    if (req.body._id || req.body.id) {
        let tmpId
        if (req.body._id) {
            tmpId = req.body._id
        } else {
            tmpId = req.body.id
        }
        User.findByIdAndUpdate(tmpId, req.body, (err, call) => {
            if (err) {
                res.json({ status: false })
            } else {
                // console.log(call)
                res.json({ status: true, id: call._id })
            }

        })
    } else {
        res.json({ status: false })
    }

}
function remove(req, res, next) {
    if (req.body._id || req.body.id) {
        let tmpId
        if (req.body._id) {
            tmpId = req.body._id
        } else {
            tmpId = req.body.id
        }
        User.findByIdAndRemove(tmpId, (err, call) => {
            if (err) {
                res.json({ status: false })
            } else {
                res.json({ status: true, id: tmpId })
            }
        });
    } else {
        res.json({ status: false })
    }

    // res.status(200).json(status)

}

module.exports = {
    createAndGetById,
    get,
    update,
    remove
}
