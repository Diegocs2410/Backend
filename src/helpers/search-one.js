const { notFound, internalServerError } = require("../middlewares/message");

const searchOne = async (res, id, model, message) => {
  try {
    const resp = await model.findById(id);
    if (!resp) {
      notFound(res, message, "");
      return null;
    }
    return resp;
  } catch (error) {
    internalServerError(res, message, "");
  }
};
module.exports = searchOne;
