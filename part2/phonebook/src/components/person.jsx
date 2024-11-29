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

export default PersonForm;
