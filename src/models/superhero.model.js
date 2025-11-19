import { Schema, model } from "mongoose";

const SuperheroSchema = new Schema(
  {
    superhero: {
      type: String,
      required: true,
      maxlength: 100,
    },
    publisher: {
      type: String,
      required: true,
      maxlength: 100,
    },
    alter_ego: {
      type: String,
      required: true,
      maxlength: 100,
    },
    first_appearance: {
      type: String,
      required: true,
      maxlength: 200,
    },
    characters: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      maxlength: 500,
    },
  },
  {
    versionKey: false,
  }
);

export const SuperheroModel = model("Superhero", SuperheroSchema);
