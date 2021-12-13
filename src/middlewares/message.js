const generalMessage = {};

generalMessage.success = (res, message, data) => {
  return res.status(200).json({
    status: "success",
    message,
    data,
  });
};

generalMessage.error = (res, message, data) => {
  res.status(400).json({
    status: "error",
    message,
    data,
  });
};

module.exports = generalMessage;
