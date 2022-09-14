import mongoose, { model, Model, Mongoose } from "mongoose";
import { oid, validateId } from ".";
import User from "../models/User";
import Movie from "../models/Movie";

// interface cModel {
//    exists: Function,
//    findOne: Function,
//    update: Function,
//    findById: Function
//    find: Function
//    select: Function
//    limit: Function
//    skip: Function
//    updateOne: Function
//    updateMany: Function
// }

type cModel = any

export async function exists(model: cModel, field = {}) {
   const data = await model.exists(field);
   return data;
}

export async function findOne(model: cModel, field = {}, select = {}) {
   const data = await model.findOne(field).select(select);
   return data;
}

export async function findById(model: cModel, id = "", field = {}, select = {}) {
   if (!validateId(id)) return null;
   const data = await model.findOne({
      _id: oid(id), ...field
   }).select(select);
   return data;
}

export async function find(model: cModel, field = {}, select = {}, more = {
   limit: 0,
   skip: 0
}) {
   const data = await model
      .find(field)
      .select(select)
      .limit(more.limit)
      .skip(more.skip)

   return data
}

export async function updateOne(model: cModel, field = {}, updateField = {}) {
   const data = await model
      .updateOne(field, updateField)

   return data.matchedCount
}

export async function updateById(model: cModel, id = "", field = {}, updateField = {}) {
   if (!validateId(id)) return 0;
   const data = await model
      .updateOne({
         _id: oid(id),
         ...field
      }, updateField)

   return data.matchedCount
}

export async function updateMany(model: cModel, field = {}, updateField = {}) {
   const data = await model
      .updateMany(field, updateField)

   return data.matchedCount
}

export async function setOne(model: cModel, field = {}, updateField = {}) {
   const data = await model
      .updateOne(field, { $set: { ...updateField } })

   return data.matchedCount
}

export async function setById(model: cModel, id = "", field = {}, updateField = {}) {
   if (!validateId(id)) return 0;
   const data = await model
      .updateOne(
         { _id: oid(id), ...field },
         { $set: { ...updateField } }
      )

   return data.matchedCount
}

export async function setMany(model: cModel, field = {}, updateField = {}) {
   const data = await model
      .updateMany(
         field,
         { $set: { ...updateField } }
      )

   return data.matchedCount
}
