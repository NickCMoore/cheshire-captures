import { createContext, useContext, useEffect, useState } from 'react';
import { axiosReq, axiosRes } from '../api/axiosDefaults';
import { useCurrentUser } from './AuthContext';

export const ProfileDataContext = createContext();
export const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
  const [profileData, setProfileData] = useState({
    pageProfile: { results: [] },
    popularProfiles: { results: [] },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = useCurrentUser(); 


  const handleFollow = async (clickedProfile) => {
    try {
      const { data } = await axiosRes.post('/followers/', {
        followed: clickedProfile.id,
      });
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            profile.id === clickedProfile.id ? { ...profile, following_id: data.id } : profile
          ),
        },
        popularProfiles: {
          results: prevState.popularProfiles.results.map((profile) =>
            profile.id === clickedProfile.id ? { ...profile, following_id: data.id } : profile
          ),
        },
      }));
    } catch (err) {
      console.error('Error following profile:', err);
    }
  };

  const handleUnfollow = async (clickedProfile) => {
    try {
      await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);
      setProfileData((prevState) => ({
        ...prevState,
        pageProfile: {
          results: prevState.pageProfile.results.map((profile) =>
            profile.id === clickedProfile.id ? { ...profile, following_id: null } : profile
          ),
        },
        popularProfiles: {
          results: prevState.popularProfiles.results.map((profile) =>
            profile.id === clickedProfile.id ? { ...profile, following_id: null } : profile
          ),
        },
      }));
    } catch (err) {
      console.error('Error unfollowing profile:', err);
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const { data } = await axiosReq.get('/profiles/?ordering=-followers_count');
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
        setError(null);
      } catch (err) {
        console.error('Error fetching profiles:', err);
        setError('Failed to load profiles');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [currentUser]);

  if (loading) return <div>Loading profile data...</div>;
  if (error) return <div>{error}</div>;

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider value={{ handleFollow, handleUnfollow }}>
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};
