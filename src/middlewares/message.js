const generalMessage = {};

generalMessage.success = (res, message, data) => {
  res.status(200).json({
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
generalMessage.notFound = (res, message, data) => {
  res.status(404).json({
    status: "error",
    message,
    data,
  });
};

generalMessage.unauthorized = (res, message, data) => {
  res.status(401).json({
    status: "error",
    message,
    data,
  });
};

generalMessage.internalServerError = (res, message, data) => {
  res.status(500).json({
    status: "error",
    message,
    data,
  });
};

module.exports = generalMessage;
