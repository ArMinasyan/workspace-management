export default (query: string, params) => {
  const parameters = [];
  let index = 0;
  Object.keys(params).map((key) => {
    const findKey = query.indexOf(`:${key}`);
    if (findKey !== -1) {
      query = query.split(`:${key}`).join(`$${index + 1}`);
      parameters.push(params[key]);
      index++;
    }
  });

  return {
    query,
    parameters,
  };
};
