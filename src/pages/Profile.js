import React, { useEffect, useState } from "react";
import { useCurrentUser } from "../contexts/AuthContext"; 
import { axiosReq } from "../api/axiosDefaults";

const Profile = () => {
  const currentUser = useCurrentUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: "",
    instagram: "",
    twitter: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (currentUser) {
          const { data } = await axiosReq.get(`/photographers/${currentUser.id}/`);
          setProfile(data);
          setProfileData({
            display_name: data.display_name,
            bio: data.bio,
            location: data.location,
            website: data.website,
            instagram: data.instagram,
            twitter: data.twitter,
          });
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchProfile();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach((key) => {
        formData.append(key, profileData[key]);
      });
      await axiosReq.put(`/photographers/${currentUser.id}/`, formData);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-details">
        <h1>{profile?.display_name || currentUser?.username}</h1>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <button type="submit">Save Changes</button>
          </form>
        ) : (
          <button onClick={() => setEditMode(true)}>Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default Profile;
