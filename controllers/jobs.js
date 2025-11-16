const Job = require("../models/Job");
const CustomApiError = require("../errors/customError");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  if (!jobs) {
    throw CustomApiError.badRequest(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: getReasonPhrase(StatusCodes.OK),
    data: jobs,
  });
};

const getJob = async (req, res) => {
  const jobsId = req.params.id;
  const job = await Job.findOne({ createdBy: req.user.userId, _id: jobsId });

  if (!job) {
    throw CustomApiError.badRequest(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    status: StatusCodes.OK,
    message: getReasonPhrase(StatusCodes.OK),
    data: job,
  });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    status: StatusCodes.CREATED,
    message: getReasonPhrase(StatusCodes.CREATED),
    data: job,
  });
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const { status } = req.body;
  const job = await Job.findOneAndUpdate(
    { createdBy: req.user.userId, _id: jobId },
    { $set: { status } },
    { new: true, runValidators: true }
  );

  if (!job) {
    throw CustomApiError.badRequest(getReasonPhrase(StatusCodes.BAD_REQUEST));
  }

  res.status(StatusCodes.OK).json({
    success: true,
    message: getReasonPhrase(StatusCodes.OK),
    data: job,
  });
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const job = await Job.findOneAndDelete({
    createdBy: req.user.userId,
    _id: jobId,
  });

  if (!job) {
    throw CustomApiError.notFound(
      "job not found or you are not allowed to delete it"
    );
  }
};
module.exports = { getAllJobs, getJob, createJob, updateJob, deleteJob };
