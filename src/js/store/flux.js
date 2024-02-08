const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
		},
		actions: { //aquí van a ir los fletch por que son las acciones que vamos a requerir

			getAllContacts: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/adrianacp10_agenda")
					.then(data => data.json())
					.then(data => setStore({ contacts: data }));
			},

			createContact: async (contacts) => {
				await fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(contacts)
				});
				return getActions.getAllContacts();
			},

			updateContact: (contact, id) => {
				fetch("https://playground.4geeks.com/apis/fake/contact/${id}", {
					method: 'PUT',
					body: JSON.stringify(contact),
					headers: {
						'Content-type': 'application/json'
					}
				});

				const prevStore = getStore();
				const index = prevStore.contacts.findIndex(contact => contact.id == id);

				const newContacts = [...prevStore.contacts]
				newContacts[index] = contact

				const newStore = {
					...prevStore,
					contacts: newContacts
				}

				setStore(newStore);
			},

			deleteContactFetch: (id) => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-type': 'application/json'
					}
				});
			},

			deleteContact: (id) => {
				const prevStore = getStore();
				const newContacts = prevStore.contacts.filter(contact => contact.id !== id);
			
				const newStore = {
					...prevStore,
					contacts: newContacts
				};
			
				setStore(newStore);
				getActions().deleteContactFetch(id);
			},

			addContact: (contact) => {
				const prevStore = getStore();
				const actions = getActions();

				const newContacts = [...prevStore.contacts, contact]

				const newStore = {
					...prevStore,
					contacts: newContacts
				}

				setStore(newStore);
				actions.createContact(contact);


			},
		}
	};
};

export default getState;
