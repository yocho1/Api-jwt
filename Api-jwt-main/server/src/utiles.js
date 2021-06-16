exports.getAll = async (
  res,
  Model,
  finder = null,
  populate = null,
  select = null,
  sort = null,
  limit = null
) => {
  let all;
  if (finder) {
    all = await Model.find(finder)
      .populate(populate)
      .select(select)
      .sort(sort)
      .limit(limit);
  } else {
    all = await Model.find()
      .populate(populate)
      .select(select)
      .sort(sort)
      .limit(limit);
  }
  if (all) return res.status(200).json(all);
};
