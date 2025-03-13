import { useState } from "react";
import { useSelector } from "react-redux";
import { Camera, Mail, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { tostAction } from "../reduxStatemanagement/tostReducer";
import { authAction } from "../reduxStatemanagement/authReducer";
import { axiosInstance } from "../lib/axios";
const ProfilePage = () => {
  const { user } = useSelector((state) => state.authReducer);
  const [updating, setUpdating] = useState(false);
  const [currentPic, setcurrentPic] = useState(null);
  const dispatch = useDispatch();

  const updateProfile = async (data) => {
    setUpdating(true);
    try {
      const res = await axiosInstance.put("/auth/uploadprofilepicture", data);
      const updateddata = res.data;
      if (updateddata.success) {
        dispatch(authAction.setUser(updateddata.upload.user));
        dispatch(
          tostAction.addToast({
            success: true,
            message: "Profile updated successfully",
          })
        );
      }
    } catch (error) {
      console.log("error in update profile:", error);
      dispatch(
        tostAction.addToast({
          success: false,
          message: error.message,
        })
      );
    } finally {
      setUpdating(false);
    }
  };
  const MAX_FILE_SIZE = 2 * 1024 * 1024;
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    console.log(file.size);

    if (file.size > MAX_FILE_SIZE) {
      dispatch(
        tostAction.addToast({
          success: false,
          message: "File size exceeds the 2MB limit.",
        })
      );
      return;
    }
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setcurrentPic(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold ">Profile</h1>
            <p className="mt-2">Your profile information</p>
          </div>

          {/* avatar upload section */}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={user.profilePic || currentPic || "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer
                  transition-all duration-200
                  ${updating ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={updating}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {updating
                ? "Uploading..."
                : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{user.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
