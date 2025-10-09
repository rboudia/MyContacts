import { getAllContacts, createContact, patchContact, deleteContact } from "../controllers/ContactController.js";
import * as ContactService from "../services/ContactService.js";

describe("ContactController", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {}, user: { id: "user123" } };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe("getAllContacts", () => {
    it("retourne tous les contacts", async () => {
      const fakeContacts = [{ firstName: "John" }];
      jest.spyOn(ContactService, "getAllContactsService").mockResolvedValue(fakeContacts);

      await getAllContacts(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(fakeContacts);
    });
  });

  describe("createContact", () => {
    it("crée un contact avec succès", async () => {
      req.body = { firstName: "John", lastName: "Doe", phone: "0123456789" };
      const fakeContact = { firstName: "John" };
      jest.spyOn(ContactService, "createContactService").mockResolvedValue(fakeContact);

      await createContact(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact créé avec succès", contact: fakeContact });
    });

    it("renvoie une erreur 400 si tous les champs ne sont pas remplis", async () => {
      req.body = { firstName: "", lastName: "", phone: "" };
      jest.spyOn(ContactService, "createContactService").mockRejectedValue(new Error("Tous les champs sont requis"));

      await createContact(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: "Tous les champs sont requis" });
    });
  });

  describe("patchContact", () => {
    it("modifie un contact avec succès", async () => {
      req.params.id = "contact123";
      req.body = { phone: "0987654321" };
      const fakeContact = { firstName: "John", phone: "0987654321" };
      jest.spyOn(ContactService, "patchContactService").mockResolvedValue(fakeContact);

      await patchContact(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact modifié avec succès", contact: fakeContact });
    });

    it("renvoie 404 si contact non trouvé", async () => {
      req.params.id = "contact123";
      req.body = { phone: "0987654321" };
      jest.spyOn(ContactService, "patchContactService").mockRejectedValue(new Error("Contact non trouvé."));

      await patchContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact non trouvé." });
    });
  });

  describe("deleteContact", () => {
    it("supprime un contact avec succès", async () => {
      req.params.id = "contact123";
      jest.spyOn(ContactService, "deleteContactService").mockResolvedValue({});

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact supprimé." });
    });

    it("renvoie 404 si contact non trouvé", async () => {
      req.params.id = "contact123";
      jest.spyOn(ContactService, "deleteContactService").mockRejectedValue(new Error("Contact non trouvé."));

      await deleteContact(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Contact non trouvé." });
    });
  });
});
