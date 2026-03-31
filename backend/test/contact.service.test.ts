import { describe, expect, it } from "bun:test";
import { ContactService } from "../src/modules/contact/service";

let contactId: string;

describe("ContactService", () => {
  it("should create a contact", async () => {
    const contact = await ContactService.create({
      platform: "github",
      title: "GitHub",
      url: "https://github.com/myuser",
      sortOrder: 0,
    });
    expect(contact).toBeDefined();
    expect(contact.platform).toBe("github");
    expect(contact.title).toBe("GitHub");
    expect(contact.url).toBe("https://github.com/myuser");
    expect(contact.sortOrder).toBe(0);

    contactId = contact.id;
  });

  it("should get all contacts", async () => {
    const contacts = await ContactService.getAll();
    expect(contacts.length).toBeGreaterThanOrEqual(1);
    const found = contacts.find((c) => c.id === contactId);
    expect(found).toBeDefined();
  });

  it("should get contact by id", async () => {
    const contact = await ContactService.getById(contactId);
    expect(contact).not.toBeNull();
    expect(contact!.platform).toBe("github");
    expect(contact!.title).toBe("GitHub");
  });

  it("should return null for non-existent contact", async () => {
    const contact = await ContactService.getById("non-existent-id");
    expect(contact).toBeNull();
  });

  it("should update a contact", async () => {
    const contact = await ContactService.update(contactId, {
      title: "My GitHub",
      platform: "github",
    });
    expect(contact).not.toBeNull();
    expect(contact!.title).toBe("My GitHub");
  });

  it("should return null when updating non-existent contact", async () => {
    const contact = await ContactService.update("non-existent-id", {
      title: "Nope",
    });
    expect(contact).toBeNull();
  });

  it("should delete a contact", async () => {
    const deleted = await ContactService.delete(contactId);
    expect(deleted).not.toBeNull();
    expect(deleted!.id).toBe(contactId);

    const found = await ContactService.getById(contactId);
    expect(found).toBeNull();
  });

  it("should return null when deleting non-existent contact", async () => {
    const deleted = await ContactService.delete("non-existent-id");
    expect(deleted).toBeNull();
  });
});
