
const quit_counts = require('../../models/quitter');

var getYesterdayCount = (req, res) => {
    var query_date = new Date();
    query_date.setDate(query_date.getDate() -1);
    var yesterdayArr = query_date.toISOString().split('T');
    var yesterday = yesterdayArr[0];
    quit_counts.find({dateString: yesterday}, function(err, docs){
        if (err){
            res.send(err);
        } else {
            res.send(docs);
        }
    });
}

var samplePost = async(req, res) => {
    const {count, dateString} = req.body;
    let quitter = {};
    quitter.date = new Date();
    quitter.count = count;
    quitter.dateString = dateString;
    let quitterModel = new quit_counts(quitter);
    await quitterModel.save();
    res.json(quitterModel[0]);
}

var postTodayCount = async(req, res) => {
    console.log(req.body);
    var count = '';
    if(req.body.count != undefined && req.body.count != null || req.body.count != ""){
        count = req.body.count;
    }

    if(count == ""){
        var resObj = {"status": "success", "message": "Missing Inputs"};
        res.send(resObj);
    }
    findTodayEntry(async(err, info) => {
        if(err){
            res.send({"status": "success", "message": err});
        } else {
            var query_date = new Date();
            var todayArr = query_date.toISOString().split('T');
            var today = todayArr[0];
            query_date = new Date(today);
            let quitter = {};
            quitter.date = query_date;
            quitter.count = count;
            quitter.dateString = today;
            if(info.flag == false){
                let quitterModel = new quit_counts(quitter);
                await quitterModel.save();
                res.send({"status": "success" , "message" :"successfully inserted", "data": quitterModel});
            } else {
                quit_counts.findOneAndUpdate({dateString: today}, quitter, {new: true}, function(err, docsTwo){
                    if(err) res.send({"status": "failure", "message": err});
                    else res.send({"status": "success", "message": "successfully updated", "data": docsTwo});
                });
            }
        }
    });
}


var getTodayCount = (req, res) => {
    var query_date = new Date();
    var todayArr = query_date.toISOString().split('T');
    var today = todayArr[0];
    quit_counts.find({dateString: today}, function(err, docs){
        if (err){
            res.send({"status": "failure", "message": err});
        } else {
            res.send({"status": "success", "message": "retrieved successfully", "data": docs});
        }
    });
}

function findTodayEntry(cb) {
    var query_date = new Date();
    var todayArr = query_date.toISOString().split('T');
    var today = todayArr[0];
    var returnVal;
    quit_counts.find({dateString: today}, function(err, docs){
        if (err){
            cb(err, null);
        } else {
            if(docs.length < 1){
                var toPass = {};
                toPass.flag = false;
                cb(null, toPass);
            } else {
                var toPass = {};
                toPass.flag = true;
                cb(null, toPass)
            }
        }
    });
}

module.exports.getYesterdayCount = getYesterdayCount;
module.exports.samplePost = samplePost;
module.exports.getTodayCount = getTodayCount;
module.exports.postTodayCount = postTodayCount;