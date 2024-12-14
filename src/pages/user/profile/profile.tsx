import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { IUser } from '@/lib/types';


const Profile: React.FC = () => {
  const [user, setUser] = useState<IUser>({
    id: 1,
    firstName: "John",
    lastName: "Doe",
    avatarUrl: "https://via.placeholder.com/150",
    dob: new Date("1990-01-01"),
    email: "john.doe@example.com",
    phoneNumber: "123-456-7890",
    gender: 1,
  } as IUser);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSave = () => {
    console.log("Profile saved:", user);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold mb-6">User Profile</h1>
      
      <div className="flex flex-col items-center mb-8">
        <Avatar className="w-24 h-24 mb-4">
          <img src={user.avatarUrl} alt="User Avatar" />
        </Avatar>
        <Button variant="outline" size="sm">Change Avatar</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <Input
            type="text"
            name="firstName"
            value={user.firstName || ''}
            onChange={handleInputChange}
            placeholder="Enter your first name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <Input
            type="text"
            name="lastName"
            value={user.lastName || ''}
            onChange={handleInputChange}
            placeholder="Enter your last name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input
            type="email"
            name="email"
            value={user.email || ''}
            onChange={handleInputChange}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <Input
            type="tel"
            name="phoneNumber"
            value={user.phoneNumber || ''}
            onChange={handleInputChange}
            placeholder="Enter your phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Date of Birth</label>
          <Input
            type="date"
            name="dob"
            value={user.dob ? user.dob.toISOString().split('T')[0] : ''}
            onChange={(e) =>
              setUser((prevUser) => ({ ...prevUser, dob: new Date(e.target.value) }))
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={(e) => setUser((prevUser) => ({ ...prevUser, gender: Number(e.target.value) }))}
            className="border rounded px-3 py-2 w-full"
          >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Other</option>
          </select>
        </div>
      </div>
      
      <div className="mt-6">
        <Button onClick={handleSave} className="w-full md:w-auto">
          Save Profile
        </Button>
      </div>
    </div>
  );
};

export default Profile;
