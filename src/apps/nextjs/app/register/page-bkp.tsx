'use client';

import {AuthForm} from '@/app/components/Authentication/AuthForm/Page';
// import { SubmitButton } from '@/app/ui/custom/submit-button';
import {useEffect, useState} from 'react';
import {AuthenticationLayout} from "@/app/components/Authentication/AuthenticationLayout/Page";
// import {useActionState} from 'react';

import Image from "next/image";
import Head from "next/head";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

export default function Page() {
    const [email, setEmail] = useState('');
    // const handleSubmit = (formData: FormData) => {
    //     setEmail(formData.get('email') as string);
    //     // formAction(formData);
    // };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        userName: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    // Handler for input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update form data
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // Clear errors as user types
        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        // First Name
        if (formData.firstName.trim().length < 2) {
            newErrors.firstName = "First name must be at least 2 characters.";
        }

        // Last Name
        if (formData.lastName.trim().length < 2) {
            newErrors.lastName = "Last name must be at least 2 characters.";
        }

        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }

        // Username
        if (formData.userName.trim().length < 3) {
            newErrors.userName = "Username must be at least 3 characters.";
        }

        // Password
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(formData.password)) {
            newErrors.password =
                "Password must be at least 8 characters, including letters and numbers.";
        }

        // Confirm Password
        if (formData.confirmPassword !== formData.password) {
            newErrors.confirmPassword = "Passwords do not match.";
        }

        // Phone Number
        const phoneRegex = /^\d{10,15}$/; // Adjust the length as needed
        if (!phoneRegex.test(formData.phoneNumber)) {
            newErrors.phoneNumber =
                "Phone number must be numeric and between 10 to 15 digits.";
        }

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    // Handler for form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (validate()) {
            // Proceed with form submission (e.g., send data to API)
            console.log("Form Submitted", formData);
        }
    };

    return (
        <AuthenticationLayout>
            <Head>
                <title>Register | MyApp</title>
            </Head>
                {/* Content */}
                <div className="relative flex items-center justify-center min-h-screen px-4">
                    <div className="w-full max-w-md bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
                        {/* Logo */}
                        <div className="flex justify-center mb-6">
                            <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                        </div>

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-gray-700">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.firstName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="John"
                                    required
                                />
                                {errors.firstName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
                                )}
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-gray-700">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.lastName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="Doe"
                                    required
                                />
                                {errors.lastName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.email ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="john.doe@example.com"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Username */}
                            <div>
                                <label htmlFor="userName" className="block text-gray-700">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="userName"
                                    name="userName"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.userName ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="johndoe123"
                                    required
                                />
                                {errors.userName && (
                                    <p className="text-red-500 text-sm mt-1">{errors.userName}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <label htmlFor="password" className="block text-gray-700">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.password ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="********"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {showPassword ? (
                                        <IoEyeOutline className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <label htmlFor="confirmPassword" className="block text-gray-700">
                                    Confirm Password
                                </label>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.confirmPassword ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="********"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? (
                                        <IoEyeOffOutline className="h-5 w-5 text-gray-500" />
                                    ) : (
                                        <IoEyeOutline className="h-5 w-5 text-gray-500" />
                                    )}
                                </button>
                                {errors.confirmPassword && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label htmlFor="phoneNumber" className="block text-gray-700">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border ${
                                        errors.phoneNumber ? "border-red-500" : "border-gray-300"
                                    } rounded-md focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="1234567890"
                                    required
                                />
                                {errors.phoneNumber && (
                                    <p className="text-red-500 text-sm mt-1">
                                        {errors.phoneNumber}
                                    </p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                >
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </AuthenticationLayout>
    );
}