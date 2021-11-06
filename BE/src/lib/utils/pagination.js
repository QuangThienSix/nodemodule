export const getPagingData = (data, _page, _limit, message) => {
  const pagination = {
    _page: _page,
    _limit: _limit,
    _totalRows: data.length,
  };
  return {
    message,
    data: data.slice(_limit * (_page - 1), _limit * _page),
    pagination: pagination,
  };
};

export const responsePaginationSuccess = (
  response,
  data,
  _page,
  _limit,
  message
) => {
  return response.status(200).send(getPagingData(data, _page, _limit, message));
};
