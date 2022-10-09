"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setMany = exports.setById = exports.setOne = exports.removeById = exports.removeOne = exports.remove = exports.updateMany = exports.updateById = exports.updateOne = exports.find = exports.findById = exports.findOne = exports.exists = void 0;
const _1 = require(".");
async function exists(model, field = {}) {
    const data = await model.exists(field);
    return data;
}
exports.exists = exists;
async function findOne(model, field = {}, select = {}) {
    const data = await model.findOne(field).select(select);
    return data;
}
exports.findOne = findOne;
async function findById(model, id, field = {}, select = {}) {
    if (!(0, _1.validateId)(id))
        return null;
    const data = await model.findOne({
        _id: (0, _1.oid)(id), ...field
    }).select(select);
    return data;
}
exports.findById = findById;
async function find(model, field = {}, select = {}, sort = {}, more = {
    limit: 0,
    skip: 0
}) {
    const data = await model
        .find(field)
        .select(select)
        .sort(sort)
        .limit(more.limit)
        .skip(more.skip);
    return data;
}
exports.find = find;
async function updateOne(model, field = {}, updateField = {}) {
    const data = await model
        .updateOne(field, updateField);
    return data.matchedCount;
}
exports.updateOne = updateOne;
async function updateById(model, id, field = {}, updateField = {}) {
    if (!(0, _1.validateId)(id))
        return 0;
    const data = await model
        .updateOne({
        _id: (0, _1.oid)(id),
        ...field
    }, updateField);
    return data.matchedCount;
}
exports.updateById = updateById;
async function updateMany(model, field = {}, updateField = {}) {
    const data = await model
        .updateMany(field, updateField);
    return data.matchedCount;
}
exports.updateMany = updateMany;
async function remove(model, field = {}) {
    const data = await model
        .deleteMany(field);
    return data.deletedCount;
}
exports.remove = remove;
async function removeOne(model, field = {}) {
    const data = await model
        .deleteOne(field);
    return data.deletedCount;
}
exports.removeOne = removeOne;
async function removeById(model, id, field = {}) {
    const data = await model
        .deleteOne({ _id: (0, _1.oid)(id), ...field });
    return data.deletedCount;
}
exports.removeById = removeById;
async function setOne(model, field = {}, updateField = {}) {
    const data = await model
        .updateOne(field, { $set: { ...updateField } });
    return data.matchedCount;
}
exports.setOne = setOne;
async function setById(model, id, field = {}, updateField = {}) {
    if (!(0, _1.validateId)(id))
        return 0;
    const data = await model
        .updateOne({ _id: (0, _1.oid)(id), ...field }, { $set: { ...updateField } });
    return data.matchedCount;
}
exports.setById = setById;
async function setMany(model, field = {}, updateField = {}) {
    const data = await model
        .updateMany(field, { $set: { ...updateField } });
    return data.matchedCount;
}
exports.setMany = setMany;
