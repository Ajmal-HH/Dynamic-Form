import { useState } from "react";

function App() {
  const [formField, setFormField] = useState([{ name: "", age: "" }]);
  const [errors, setErrors] = useState([]);

  const handleFormChange = (e, index) => {
    let data = [...formField];
    data[index][e.target.name] = e.target.value;
    setFormField(data);

    // Clear the error for the current field on change
    const updatedErrors = [...errors];
    updatedErrors[index] = { ...updatedErrors[index], [e.target.name]: "" };
    setErrors(updatedErrors);
  };

  const validateForm = () => {
    let validationErrors = formField.map(() => ({ name: "", age: "" }));

    formField.forEach((field, index) => {
      if (!field.name.trim()) {
        validationErrors[index].name = "Name is required.";
      }
      if (!field.age.trim() || isNaN(field.age) || field.age <= 0) {
        validationErrors[index].age = "Age must be a valid number > 0";
      }
    });

    setErrors(validationErrors);

    // Return false if there are any errors
    return validationErrors.every(
      (error) => !error.name && !error.age
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted successfully:", formField);
      setErrors([]);
    } else {
      console.error("Validation failed");
    }
  };

  const addFields = () => {
    let object = { name: "", age: "" };
    setFormField([...formField, object]);
    setErrors([...errors, { name: "", age: "" }]);
  };

  const removeFields = (e, index) => {
    e.preventDefault();
    let data = [...formField];
    data.splice(index, 1);
    setFormField(data);

    let updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full text-center mb-3">
        <h1 className="text-3xl font-semibold text-gray-600">Dynamic Form</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl bg-gradient-to-r from-emerald-500 to-emerald-900 p-6 shadow-lg rounded space-y-4"
      >
        {formField.map((form, index) => (
          <div key={index} className="space-y-2">
            <div className="flex space-x-4 items-start">
              {/* Name Input */}
              <div className="flex-1">
                <input
                  name="name"
                  placeholder="Name"
                  className="w-full p-2 border rounded"
                  onChange={(e) => handleFormChange(e, index)}
                  value={form.name}
                />
                {errors[index]?.name && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors[index].name}
                  </div>
                )}
              </div>

              {/* Age Input */}
              <div className="flex-1">
                <input
                  name="age"
                  placeholder="Age"
                  type="number"
                  className="w-full p-2 border rounded"
                  onChange={(e) => handleFormChange(e, index)}
                  value={form.age}
                />
                {errors[index]?.age && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors[index].age}
                  </div>
                )}
              </div>

              {/* Remove Button */}
              <button
                type="button"
                onClick={(e) => removeFields(e, index)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                REMOVE
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={addFields}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            ADD MORE
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-700 text-white rounded"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
