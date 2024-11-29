const Person = ({ person, deletePerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={deletePerson}>delete</button>
    </li>
  );
};

const Numbers = ({ persons, deletePerson }) => {
  return (
    <ul>
      {persons.map((person) => {
        return (
          <Person
            key={person.id}
            person={person}
            deletePerson={() => {
              deletePerson(person);
            }}
          />
        );
      })}
    </ul>
  );
};

export default Numbers;
