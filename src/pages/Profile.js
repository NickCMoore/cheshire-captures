import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { id } = useParams(); 
  const [profile, setProfile] = useState(null); 
  const [currentUser, setCurrentUser] = useState(null); 
  const [isFollowing, setIsFollowing] = useState(false); 
  const [isOwnProfile, setIsOwnProfile] = useState(false); 

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await axios.get('/auth/user/');
        setCurrentUser(data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(`/api/photographers/${id}/`);
        setProfile(data);
        setIsFollowing(data.is_following); 

        if (currentUser && data.user === currentUser.id) {
          setIsOwnProfile(true); 
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchCurrentUser();
    fetchProfile();
  }, [id, currentUser]);

  const handleFollowToggle = async () => {
    try {
      if (isFollowing) {
        await axios.post(`/api/follows/${id}/unfollow/`);
        setIsFollowing(false);
      } else {
        await axios.post(`/api/follows/`, { following: id });
        setIsFollowing(true);
      }
    } catch (error) {
      console.error('Error following/unfollowing photographer:', error);
    }
  };

  if (!profile || !currentUser) return <p>Loading...</p>;

  return (
    <div>
      <h1>{profile.display_name}</h1>
      <p>{profile.bio}</p>

      <div>
        <h2>Photos</h2>
        {profile.photos && profile.photos.length > 0 ? (
          profile.photos.map((photo) => (
            <img key={photo.id} src={photo.image_url} alt={photo.title} />
          ))
        ) : (
          <p>No photos yet.</p>
        )}
      </div>

      <div>
        <h2>Social Links</h2>
        {profile.website && <a href={profile.website}>Website</a>}
        {profile.instagram && <a href={profile.instagram}>Instagram</a>}
        {profile.twitter && <a href={profile.twitter}>Twitter</a>}
      </div>

      {isOwnProfile ? (
        <button>Edit Profile</button>
      ) : (
        <button onClick={handleFollowToggle}>
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default Profile;
