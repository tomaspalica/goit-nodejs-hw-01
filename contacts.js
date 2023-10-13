const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(process.cwd(), "/db/contacts.json");
console.log(contactsPath);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = await JSON.parse(data);
    return contacts;
  } catch (error) {
    console.log(error.mesagge);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const results = contacts.find(({ id }) => id === contactId);
    return results;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const results = await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.filter(({ id }) => id !== contactId))
    );
    return contacts.filter(({ id }) => id == contactId);
  } catch (error) {}
}

async function addContact(name, email, phone) {
  try {
    const newContact = { id: uuidv4(), name: name, email: email, phone: phone };
    const contacts = await listContacts();
    const newCollection = fs.writeFile(
      contactsPath,
      JSON.stringify([...contacts, newContact])
    );
    return newContact;
  } catch (error) {}
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
