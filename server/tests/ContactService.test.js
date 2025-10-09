import * as ContactService from "../services/ContactService.js";
import Contact from "../models/Contact.js";

jest.mock("../models/Contact.js");

describe("ContactService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Mock du constructeur Contact
  Contact.mockImplementation(function ({ firstName, lastName, phone, user }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.user = user;
    this.save = jest.fn().mockResolvedValue(this);
  });

  describe("getAllContactsService", () => {
    it("doit retourner tous les contacts d'un utilisateur", async () => {
      const fakeContacts = [{ firstName: "John" }, { firstName: "Jane" }];
      Contact.find.mockResolvedValue(fakeContacts);

      const contacts = await ContactService.getAllContactsService("user123");
      expect(contacts).toEqual(fakeContacts);
      expect(Contact.find).toHaveBeenCalledWith({ user: "user123" });
    });
  });

  describe("createContactService", () => {
    it("doit créer un contact avec succès", async () => {
      Contact.findOne.mockResolvedValue(null);

      const contact = await ContactService.createContactService({
        firstName: "John",
        lastName: "Doe",
        phone: "0123456789",
        userId: "user123"
      });

      expect(contact.firstName).toBe("John");
      expect(contact.lastName).toBe("Doe");
      expect(Contact.findOne).toHaveBeenCalledWith({ phone: "0123456789", user: "user123" });
      expect(contact.save).toHaveBeenCalled();
    });

    it("doit renvoyer une erreur si un champ est manquant", async () => {
      await expect(ContactService.createContactService({
        firstName: "John",
        lastName: "",
        phone: "0123456789",
        userId: "user123"
      })).rejects.toThrow("Tous les champs sont requis");
    });

    it("doit renvoyer une erreur si le numéro est déjà utilisé", async () => {
      Contact.findOne.mockResolvedValue({ phone: "0123456789" });

      await expect(ContactService.createContactService({
        firstName: "John",
        lastName: "Doe",
        phone: "0123456789",
        userId: "user123"
      })).rejects.toThrow("Ce numéro est déjà utilisé pour un autre contact.");
    });
  });

  describe("patchContactService", () => {
    beforeEach(() => {
      Contact.findOne.mockReset();
      Contact.findOneAndUpdate = jest.fn();
    });

    it("doit modifier un contact avec succès", async () => {
      const updatedContact = { firstName: "John", phone: "0987654321" };
      Contact.findOne.mockResolvedValue(null);
      Contact.findOneAndUpdate.mockResolvedValue(updatedContact);

      const contact = await ContactService.patchContactService({
        id: "contact123",
        update: { phone: "0987654321" },
        userId: "user123"
      });

      expect(contact).toEqual(updatedContact);
      expect(Contact.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: "contact123", user: "user123" },
        { phone: "0987654321" },
        { new: true }
      );
    });

    it("doit renvoyer une erreur si contact non trouvé", async () => {
      Contact.findOne.mockResolvedValue(null);
      Contact.findOneAndUpdate.mockResolvedValue(null);

      await expect(ContactService.patchContactService({
        id: "contact123",
        update: { phone: "0987654321" },
        userId: "user123"
      })).rejects.toThrow("Contact non trouvé.");
    });
  });

  describe("deleteContactService", () => {
    beforeEach(() => {
      Contact.findOneAndDelete = jest.fn();
    });

    it("doit supprimer un contact avec succès", async () => {
      Contact.findOneAndDelete.mockResolvedValue({ firstName: "John" });

      const contact = await ContactService.deleteContactService({ id: "contact123", userId: "user123" });
      expect(contact.firstName).toBe("John");
    });

    it("doit renvoyer une erreur si contact non trouvé", async () => {
      Contact.findOneAndDelete.mockResolvedValue(null);

      await expect(ContactService.deleteContactService({ id: "contact123", userId: "user123" }))
        .rejects
        .toThrow("Contact non trouvé.");
    });
  });
});
