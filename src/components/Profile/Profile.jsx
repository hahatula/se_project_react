import './Profile.css';
import SideBar from './SideBar';
import ClothesSection from './ClothesSection';

function Profile({
  handleItemClick,
  clothingItems,
  handleAddButton,
  handleEditProfileButton,
  onCardLike
}) {
  return (
    <div className="profile">
      <SideBar handleEditProfileButton={handleEditProfileButton} />
      <ClothesSection
        handleItemClick={handleItemClick}
        clothingItems={clothingItems}
        handleAddButton={handleAddButton}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
