const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: [],
		},
		actions: {
			// Se mantiene igual: función para obtener todos los contactos
			getAllContacts: () => {
				fetch("https://playground.4geeks.com/apis/fake/contact/agenda/adrianacp10_agenda")
					.then(data => data.json())
					.then(data => setStore({ contacts: data }));
			},

			// Se mantiene igual: función para crear un nuevo contacto
			createContact: async (contacts) => {
				await fetch("https://playground.4geeks.com/apis/fake/contact/", {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify(contacts)
				});
				
				// Se actualiza el estado de la tienda para reflejar el nuevo contacto 
				setStore({ contacts: [...getStore().contacts] });
			},

			// Se actualizó: función para actualizar un contacto existente
			updateContact: async (contact, id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: 'PUT',
						body: JSON.stringify(contact),
						headers: {
							'Content-type': 'application/json'
						}
					});
					
					if (!response.ok) {
						throw new Error('Error al actualizar el contacto');
					}
					
					// Se actualiza el estado de la tienda para reflejar los cambios
					const prevStore = getStore();
					const index = prevStore.contacts.findIndex(contact => contact.id == id);
	
					const newContacts = [...prevStore.contacts];
					newContacts[index] = contact;
	
					const newStore = {
						...prevStore,
						contacts: newContacts
					};
	
					setStore(newStore);
				} catch (error) {
					console.error('Error al actualizar el contacto:', error);
				}
			},

			// Se actualizó: función para eliminar un contacto
			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
						method: 'DELETE'
					});

					if (!response.ok) {
						throw new Error('Error al eliminar el contacto');
					}
					
					// Se actualiza el estado de la tienda para reflejar los cambios
					const prevStore = getStore();
					const newContacts = prevStore.contacts.filter(contact => contact.id !== id);
					
					const newStore = {
						...prevStore,
						contacts: newContacts
					};
					
					setStore(newStore);
				} catch (error) {
					console.error('Error al eliminar el contacto:', error);
				}
			},

			// Se mantiene igual: función para agregar un nuevo contacto
			addContact: (contact) => {
				const prevStore = getStore();
				const actions = getActions();

				const newContacts = [...prevStore.contacts, contact];

				const newStore = {
					...prevStore,
					contacts: newContacts
				};

				setStore(newStore);
				actions.createContact(contact);
			}
		}
	};
};

export default getState;
