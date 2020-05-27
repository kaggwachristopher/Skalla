//requiring dependencies
const Pm_estimateRequest = require("./pm_estimateRequest_model");
const Estimate = require("../estimate_module/estimate_model");
const projectmodel = require("../project_module/project_model");
const developermodel = require("../user_module/user_model");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

//getting draft estimate request
exports.draftEstimatelist = function(req, res, next) {
    Pm_estimateRequest.find({
    projectManager: req.params.requestedId,
    status: "Draft"
  })
    .populate({ path: "projectManager", select: "name-_id" })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, pm_estimateRequest) {
      if (err) {
        return next(err);
      } else {
        res.json(pm_estimateRequest);
      }
    });
};

//getting estimated requests
exports.Pm_estimatedlist = function(req, res, next) {
  Pm_estimateRequest.find({ status: "Estimated" })
    .populate("project", "name")
    .populate("developer", "name")

    .exec(function(err, pm_estimateRequest) {
      if (err) {
        return err;
      } else {
        res.json(pm_estimateRequest);
      }
    });
};

//changing status to draft
exports.changingDraft = function(req, res) {
  Pm_estimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId },
    { status: "Draft" },
    req.body,
    function(next, pm_estimateRequest) {
      if (pm_estimateRequest !== null) {
        res.json(pm_estimateRequest);
      } else {
        res.send(next);
      }
    }
  );
};

//changing status to estimated
exports.changingEstimated = function(req, res) {
  Pm_estimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId },
    { status: "Estimated" },
    function(next, pm_estimateRequest) {
      if (pm_estimateRequest !== null) {
        res.json(pm_estimateRequest);
      } else {
        res.send(next);
      }
    }
  );
};
//requesting estimates with status "Estimated", "Submitted"
exports.pm_estimateRequestList = function(req, res, next) {
  Pm_estimateRequest.find({
    projectManager: req.params.requestedId,
    status: { $in: ["Estimated", "Submitted"] }
  })

    .populate({ path: "projectManager", select: "name-_id" })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "developer", select: "name-_id" })

    .exec(function(err, pm_estimateRequest) {
      if (err) {
        return err;
      } else {
        res.json(pm_estimateRequest);
      }
    });
};

//create estimate request
exports.createEstimateRequest = async function(req, res) {
  try {
    Object.assign(req.body, {
      DateEstimated: "",
      quantity: Number,
      preparationTotal: Number,
      actualMeetingTotal: Number,
      meetingReviewTotal: Number,
      certainity: Number,
      SumTotal: Number,
      AdjustedTotal: Number,
    });
    const pm_estimateRequest = new Pm_estimateRequest(req.body);

    const createdEstimateRequest = await estimateRequest.save(pm_estimateRequest);

    const project = await projectmodel.findById(pm_estimateRequest.project);

    const developer = await developermodel.findById(pm_estimateRequest.developer);

    createdEstimateRequest.developer = developer;
    createdEstimateRequest.project = project;
    res.send(createdEstimateRequest);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

//get single estimate request
exports.singleEstimateRequest = function(req, res) {
  Pm_stimateRequest.findById({ _id: req.params.requestId })
    .populate({ path: "project", select: "name-_id" })
    .populate({ path: "projectManager", select: "name" })

    .populate({ path: "developer", select: "name-_id" })
    .exec(function(err, pm_estimateRequest) {
      if (err) {
        return err;
      } else {
        res.json(pm_estimateRequest);
      }
    });
};

//update single estimate request
exports.updateEstimateRequest = function(req, res) {
  Pm_EstimateRequest.findByIdAndUpdate(
    { _id: req.params.requestId },
    req.body,
    function(err, pm_estimateRequest) {
      if (estimateRequest !== null) {
        res.json(pm_estimateRequest);
      } else {
        res.send(err);
      }
    }
  );
};
