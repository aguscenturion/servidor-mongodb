import fs from "fs";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { SuperheroModel } from "../src/models/superhero.model.js";
import { UserModel } from "../src/models/user.model.js";

import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB.");

    // Limpiar colecciones
    await UserModel.deleteMany({});
    await SuperheroModel.deleteMany({});
    console.log("Colecciones limpiadas.");

    // Usuarios fijos
    const fixedUsers = [
      {
        name: "Admin",
        lastname: "Root",
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
      },
      {
        name: "Usuario",
        lastname: "Normal",
        username: "user",
        email: "user@example.com",
        password: "user123",
      },
    ];

    for (const fixedUser of fixedUsers) {
      await UserModel.create({
        name: fixedUser.name,
        lastname: fixedUser.lastname,
        username: fixedUser.username,
        email: fixedUser.email,
        password: fixedUser.password,
      });
    }
    console.log("Usuarios creados.");

    // Cargar superhéroes desde el archivo JSON
    const superheroesPath = path.join(__dirname, "../data/superheroes.json");
    const superheroesData = JSON.parse(
      fs.readFileSync(superheroesPath, "utf-8")
    );

    for (const superhero of superheroesData) {
      await SuperheroModel.create({
        superhero: superhero.superhero,
        publisher: superhero.publisher,
        alter_ego: superhero.alter_ego,
        first_appearance: superhero.first_appearance,
        characters: superhero.characters,
        image: superhero.image,
      });
    }
    console.log("Superhéroes creados.");
  } catch (error) {
    console.error("Error al poblar la base de datos:", error);
  } finally {
    await mongoose.connection.close();
    process.exit();
  }
}

seed();
