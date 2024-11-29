import { useState, useEffect } from "react";
import phonebookService from "./services/phonebook";
import PersonForm from "./components/person";
import Numbers from "./components/numbers";

const Filter = ({ searchValue, handleSetSearchValue }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchValue} onChange={handleSetSearchValue} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((response) => {
      setPersons(response);
    });
  }, []);

  const handleSetPerson = (e) => {
    e.preventDefault();
    let foundPerson = persons.find((person) => person.name === newName);

    if (foundPerson != undefined) {
      let confirm = window.confirm(
        `${foundPerson.name} is already added to phonebook, replace the old number with a new one?`
      );
      if (confirm) {
        const oldPerson = persons.find((value) => value.id == foundPerson.id);
        const updatedPerson = { ...oldPerson, number: newNumber };
        phonebookService
          .update(updatedPerson, foundPerson.id)
          .then((returnedPerson) =>
            setPersons(
              persons.map((value) => {
                return value.id === returnedPerson.id ? returnedPerson : value;
              })
            )
          );
      }
    } else {
      let newPerson = {
        name: newName,
        number: newNumber,
      };

      phonebookService
        .create(newPerson)
        .then((response) => setPersons(persons.concat(response)));
    }
    setNewName("");
    setNewNumber("");
  };

  const handleSetNewName = (e) => {
    setNewName(e.target.value);
  };

  const handleSetNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleSetSearchValue = (e) => {
    setSearchValue(e.target.value);
    for (let i = persons.length - 1; i >= 0; i--) {
      if (!persons[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
        persons.splice(i, 1);
      }
    }
  };

  const deletePerson = (person) => {
    const confirm = window.confirm(`Delete ${person.name} ?`);
    if (confirm) {
      phonebookService.deletePerson(person.id).then((response) => {
        setPersons(
          persons.filter((value) => {
            return value.id !== response.id;
          })
        );
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        searchValue={searchValue}
        handleSetSearchValue={handleSetSearchValue}
      />
      <h3>Add a new</h3>
      <PersonForm
        newName={newName}
        handleSetNewName={handleSetNewName}
        handleSetPerson={handleSetPerson}
        newNumber={newNumber}
        handleSetNewNumber={handleSetNewNumber}
      />
      <h2>Numbers</h2>
      <Numbers persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
