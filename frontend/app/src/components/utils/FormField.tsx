type FormFieldProps = {
    id: string;
    label: string;
    placeholder: string;
};

const FormField = ({ id, label, placeholder} : FormFieldProps) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          name={id}
          type='text'
          placeholder={placeholder}
          className="outline-none border w-full p-2 px-3 rounded-lg focus:ring-2"
          required
        />
      </div>
    );
};

export default FormField;