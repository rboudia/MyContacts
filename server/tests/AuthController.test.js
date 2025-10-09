import { registerUser, loginUser } from "../controllers/AuthController.js";
import * as AuthService from "../services/AuthService.js";

describe("AuthController", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("registerUser", () => {
    it("crée un utilisateur avec succès", async () => {
      req.body = { firstName: "John", email: "john@test.com", password: "123456" };
      const fakeUser = { firstName: "John", email: "john@test.com" };
      jest.spyOn(AuthService, "registerUserService").mockResolvedValue(fakeUser);

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Utilisateur créé avec succès", user: fakeUser });
    });

    it("renvoie une erreur 400 si l'utilisateur existe déjà", async () => {
      req.body = { firstName: "John", email: "john@test.com", password: "123456" };
      jest.spyOn(AuthService, "registerUserService").mockRejectedValue(new Error("Utilisateur déjà existant"));

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur déjà existant" });
    });

    it("renvoie une erreur 500 pour une erreur serveur inconnue", async () => {
      req.body = { firstName: "John", email: "john@test.com", password: "123456" };
      jest.spyOn(AuthService, "registerUserService").mockRejectedValue(new Error("Erreur inconnue"));

      await registerUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Erreur serveur" });
    });
  });

  describe("loginUser", () => {
    it("retourne un token en cas de succès", async () => {
      req.body = { email: "john@test.com", password: "123456" };
      const fakeToken = "fake.jwt.token";
      jest.spyOn(AuthService, "loginUserService").mockResolvedValue(fakeToken);

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ token: fakeToken });
    });

    it("renvoie une erreur 400 si l'utilisateur n'existe pas", async () => {
      req.body = { email: "john@test.com", password: "123456" };
      jest.spyOn(AuthService, "loginUserService").mockRejectedValue(new Error("Utilisateur inexistant"));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Utilisateur inexistant" });
    });

    it("renvoie une erreur 401 si le mot de passe est incorrect", async () => {
      req.body = { email: "john@test.com", password: "wrongpass" };
      jest.spyOn(AuthService, "loginUserService").mockRejectedValue(new Error("Mot de passe incorrect"));

      await loginUser(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Mot de passe incorrect" });
    });
  });
});
