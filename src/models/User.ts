import { Schema, Model, model, connection } from "mongoose"

type UserType = {
  name: {
    firstName: string
    lastName: string
  }
  interests: [string, string, string]
  email: string
  age: number
}

const schema = new Schema<UserType>({
  name: {
    firstName: { type: String, required: true },
    lastName: String,
  },
  interests: [String],
  email: { type: String, required: true },
  age: { type: Number, required: true },
})

const modelName: string = "User"

export default connection && connection.models[modelName]
  ? (connection.models[modelName] as Model<UserType>)
  : model<UserType>(modelName, schema)
