
type FormFieldProps = {
    id: string;
    label: string;
    placeholder: string;
}

const FormField = ({ id, label, placeholder} : FormFieldProps) => {
    return (
      <div className="flex flex-col gap-1">
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          type='text'
          placeholder={placeholder}
          className="outline-none border w-full p-2 px-3 rounded-lg focus:ring-2"
        />
      </div>
    );
  };
  

const PersonalInfo = () => {

    return (
        <div className="w-full">
            <h1 className="text-xl my-9">1/3</h1>
            <h1 className=" text-4xl mb-3">Tell us a little bit about yourself</h1>

            <div className="w-full flex flex-col justify-center gap-3">
                <div className="flex justify-between">
                    <FormField id="fname" label="first name" placeholder="John" />
                    <FormField id="lname" label="last name" placeholder="Doe" />
                    <FormField id="username" label="username" placeholder="username" />
                </div>

                <div className="flex flex-col h-full gap-1">
                    <label htmlFor="">biography</label>
                    <textarea className="border outline-none p-2 rounded-lg focus:ring-2 h-48" placeholder="bio"/>
                </div>

                <div className="flex">
                    <div className="flex flex-col h-full">
                        <label htmlFor="">Gender</label>
                        <select className="text-gray-600  w-full outline-none border bg-white rounded-lg p-2 pl-3 pr-8">
                            <option value="" className="" selected>Gender</option>
                            <option value="" className="" >Gender1</option>
                            <option value="" className="">Gender2</option>
                            <option value="" className="">Gender3</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default PersonalInfo;