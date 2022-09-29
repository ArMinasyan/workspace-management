export default (page, limit = 10) => {
  page = parseInt(page, 10) || 1;
  return {
    limit,
    offset: (page - 1) * limit,
  };
};
