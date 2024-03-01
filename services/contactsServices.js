// import fs from "node:fs/promises";
// import path from "node:path";
// import { nanoid } from "nanoid";

// const contactsPath = path.join(process.cwd(), "/db/contacts.json");

// class Contacts {
//   async listContacts() {
//     const data = await fs.readFile(contactsPath);
//     const content = JSON.parse(data.toString());
//     return content;
//   }

//   async writeFile(db) {
//     const content = JSON.stringify(db, null, 2);
//     await fs.writeFile(contactsPath, content);
//   }

//   async getContactById(contactId) {
//     const contacts = await this.listContacts();
//     const contactById = contacts.find((el) => el.id === contactId);
//     return contactById || null;
//   }

//   async removeContact(contactId) {
//     const contacts = await this.listContacts();
//     const index = contacts.findIndex((el) => el.id === contactId);
//     if (index === -1) {
//       return null;
//     }
//     const [result] = contacts.splice(index, 1);
//     this.writeFile(contacts);
//     return result;
//   }

//   async addContact(name, email, phone) {
//     const newContact = {
//       id: nanoid(),
//       name,
//       email,
//       phone,
//     };
//     const contacts = await this.listContacts();
//     contacts.push(newContact);
//     this.writeFile(contacts);
//     return newContact;
//   }

//   async updateContact(id, data) {
//     const contacts = await this.listContacts();
//     const index = contacts.findIndex((el) => el.id === id);
//     if (index === -1) return null;
//     const contactData = contacts[index];
//     contacts[index] = { id, ...contactData, ...data };
//     await this.writeFile(contacts);
//     return contacts[index];
//   }
// }

// const contacts = new Contacts();

// export default contacts;
