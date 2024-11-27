import { useState } from "react";

const PersonForm = ({
  newName,
  handleSetPerson,
  handleSetNewName,
  newNumber,
  handleSetNewNumber,
}) => {
  return (
    <div>
      <form onSubmit={handleSetPerson}>
        <div>
          name: <input value={newName} onChange={handleSetNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleSetNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => {
          return (
            <li key={person.id}>
              {person.name} {person.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const Filter = ({ searchValue, handleSetSearchValue }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchValue} onChange={handleSetSearchValue} />
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSetPerson = (e) => {
    e.preventDefault();
    persons.forEach((person) => {
      if (person.name == newName) {
        return alert(`${newName} is already added to phonebook`);
      } else {
        setPersons(persons.concat({ name: newName, number: newNumber }));
      }
    });
    setNewName("");
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
    console.log(persons);
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
      <Persons persons={persons} />
    </div>
  );
};

export default App;
