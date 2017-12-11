export default function createApi(Model) {
  return {
    getAll: () => Model.find(),
    getOneById: id => Model.findOne({ id }),
    add: item => new Model(item).save(),
    updateOne: (id, item) => Model.update({ id }, { $set: item}, { upsert: true }),
    deleteOne: id => Model.deleteOne({ id })
  }
}