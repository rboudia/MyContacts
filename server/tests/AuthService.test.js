import * as AuthService from "../services/AuthService.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Mock complet
jest.mock("../models/User.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("AuthService", () => {
  describe("registerUserService", () => {
    it("crée un utilisateur avec succès", async () => {
      User.findOne.mockResolvedValue(null); // aucun utilisateur existant
      bcrypt.hash.mockResolvedValue("hashedpassword");
      User.prototype.save = jest.fn().mockResolvedValue(true);

      const user = await AuthService.registerUserService({ firstName: "John", email: "john@test.com", password: "123456" });
      expect(user).toEqual({ firstName: "John", email: "john@test.com" });
    });

    it("renvoie une erreur si l'utilisateur existe déjà", async () => {
      User.findOne.mockResolvedValue({ email: "john@test.com" });

      await expect(AuthService.registerUserService({ firstName: "John", email: "john@test.com", password: "123456" }))
        .rejects
        .toThrow("Utilisateur déjà existant");
    });
  });

  describe("loginUserService", () => {
    it("retourne un token si tout est correct", async () => {
      const fakeUser = { _id: "123", email: "john@test.com", password: "hashedpassword" };
      User.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("fake.token");

      const token = await AuthService.loginUserService({ email: "john@test.com", password: "123456" });
      expect(token).toBe("fake.token");
    });

    it("renvoie une erreur si l'utilisateur n'existe pas", async () => {
      User.findOne.mockResolvedValue(null);

      await expect(AuthService.loginUserService({ email: "john@test.com", password: "123456" }))
        .rejects
        .toThrow("Utilisateur inexistant");
    });

    it("renvoie une erreur si le mot de passe est incorrect", async () => {
      const fakeUser = { _id: "123", email: "john@test.com", password: "hashedpassword" };
      User.findOne.mockResolvedValue(fakeUser);
      bcrypt.compare.mockResolvedValue(false);

      await expect(AuthService.loginUserService({ email: "john@test.com", password: "wrongpass" }))
        .rejects
        .toThrow("Mot de passe incorrect");
    });
  });
});
