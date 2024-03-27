import "./Profile.css";
import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";


function Profile({handleItemClick}) {
  return (
    <div className="profile">
      <SideBar/>
      <ClothesSection/>
    </div>
  );
}

export default Profile;
