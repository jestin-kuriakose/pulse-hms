import { useForm } from "react-hook-form";
import React, { useState } from "react";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (e.g., send data to API)
  };
  const [preview, setPreview] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className='w-5/6 lg:w-3/4 h-screen overflow-y-scroll mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg'>
      <h2 className='text-2xl  font-main text-pry font-bold mb-4 text-center'>
        Register New Patient
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            MRD Number
          </label>
          <input
            {...register("mrdNumber", { required: "MRD Number is required" })}
            className={`mt-1 p-2 block w-full border ${
              errors.mrdNumber ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.mrdNumber && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.mrdNumber.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            First Name
          </label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className={`mt-1 p-2 block w-full border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.firstName && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Last Name
          </label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className={`mt-1 p-2 block w-full border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.lastName && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.lastName.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Date of Birth
          </label>
          <input
            type='date'
            {...register("dateOfBirth", {
              required: "Date of birth is required",
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.dateOfBirth ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.dateOfBirth && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Gender
          </label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className={`mt-1 p-2 block w-full border ${
              errors.gender ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          >
            <option value=''>Select gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
          {errors.gender && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.gender.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Nationality
          </label>
          <input
            {...register("nationality", {
              required: "Nationality is required",
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.nationality ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.nationality && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.nationality.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.email && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Marital Status
          </label>
          <input
            {...register("maritalStatus", {
              required: "Marital Status is required",
              pattern: {
                message: "Invalid Marital Status ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.maritalStatus ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.maritalStatus && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Visa Type
          </label>
          <input
            {...register("visaType", {
              required: "Visa Type is required",
              pattern: {
                message: "Invalid Visa Type ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.visaType ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.visaType && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.visaType.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            National ID
          </label>
          <input
            {...register("nationalId", {
              required: "National ID is required",
              pattern: {
                message: "Invalid National ID ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.nationalId ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.nationalId && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.nationalId.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Other ID
          </label>
          <input
            {...register("otherId", {})}
            className={`mt-1 p-2 block w-full border ${
              errors.otherId ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Phone Number
          </label>
          <input
            {...register("phoneNumber", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]+$/,
                message: "Invalid phone number",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.phoneNumber && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.phoneNumber.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Address
          </label>
          <input
            {...register("address", {
              required: "Address is required",
              pattern: {
                message: "Invalid Address ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.address ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.address && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.address.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Emirate
          </label>
          <input
            {...register("emirates", {
              required: "Emirate is required",
              pattern: {
                message: "Invalid Emirate ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.emirates ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.emirates && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.emirates.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            District
          </label>
          <input
            {...register("district", {
              required: "District is required",
              pattern: {
                message: "Invalid District ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.district ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.district && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.district.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Country
          </label>
          <input
            {...register("country", {
              required: "Country is required",
              pattern: {
                message: "Invalid Country ",
              },
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.country ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.country && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.country.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Emergency Contact Number
          </label>
          <input
            {...register("emergencyNumber", {
              required: "Emergency Contact Number is required",
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.emergencyNumber ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.emergencyNumber && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.emergencyNumber.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Emergency Contact Name
          </label>
          <input
            {...register("emergencyName", {
              required: "Emergency Contact Name is required",
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.emergencyName ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.emergencyName && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.emergencyName.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Emergency Contact Relationship
          </label>
          <input
            {...register("emergencyRelationship", {
              required: "Emergency Contact Relationship is required",
            })}
            className={`mt-1 p-2 block w-full border ${
              errors.emergencyRelationship
                ? "border-red-500"
                : "border-gray-300"
            } rounded-md`}
          />
          {errors.emergencyRelationship && (
            <p className='text-red-500 text-sm font-main mt-1'>
              {errors.emergencyRelationship.message}
            </p>
          )}
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Allergies
          </label>
          <input
            {...register("allergies", {})}
            className={`mt-1 p-2 block w-full border ${
              errors.allergies ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
        </div>

        <div className='mb-4'>
          <label className='block text-sm font-main font-medium text-gray-700'>
            Profile Picture
          </label>
          <input
            type='file'
            accept='image/*'
            {...register("profilePicture", {
              required: "Profile picture is required",
            })}
            onChange={handleImageChange}
            className='mt-1 block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer'
          />
          {errors.profilePicture && (
            <p className='text-red-500 font-main text-sm mt-1'>
              {errors.profilePicture.message}
            </p>
          )}
          {preview && (
            <img
              src={preview}
              alt='Profile Preview'
              className='mt-4 w-32 h-32 object-cover rounded-full mx-auto'
            />
          )}
        </div>
        <button
          type='submit'
          className='mt-4 w-full bg-pry hover:bg-sec-50 text-white font-main  transition duration-300 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Registration;
