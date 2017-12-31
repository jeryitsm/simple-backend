const Todolists = require('../models/todolists')
const User = require('../models/user')
function get(req, res, next) {
Todolists.find({}, (req, res, next) => {
  }).then((re)=>{
    res.status(200).json(re)
  })
  
}

function createAndGetById(req, res, next) {
  if (req.body._id == undefined && req.body.id == undefined) {
    Todolists.create(req.body, function (err, call) {
      if (err) {
        res.status(200).json({ status: false })
        return next(err)
      } else {
        if (req.body.product_isAssign) {
          User.findById(req.body.product_isAssign, (err, calluser) => {
            if (err) {
            } else {
              calluser.user_assignment.push(call._id)
              // console.log(calluser)
              User.findByIdAndUpdate(calluser._id, calluser, (err, call) => {
                if (err) {
                } else {
                }
              })
            }

          })
        } else {
          // console.log('no product assign')
        }

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
    Todolists.findById(tmpId, (err, call) => {
      if (err) {
        res.json({ status: false })
      } else {
        res.json(call)
      }
    });
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
    try {
      req.body.product_lastUpdate = Date.now();
      Todolists.findByIdAndUpdate(tmpId, req.body, (err, call) => {
        if (err) {
          res.json({ status: false })
        } else {
          if (req.body.product_isAssign) {
            User.findById(req.body.product_isAssign, (err, calluser) => {
              if (err) {
              } else {
                calluser.user_assignment.push(call._id)
                User.findByIdAndUpdate(calluser._id, calluser, (err, call) => {
                  if (err) {
                  } else {
                  }
                })
              }

            })
          } else {
          }
          res.json({ status: true, id: call._id })
        }

      })
    } catch (err) {
    }

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
   Todolists.findByIdAndRemove(tmpId, (err, call) => {
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
