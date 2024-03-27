import avatar from "../../assets/avatar-placeholder.svg";

function SideBar() {
  return (
    <div className="profile__user">
      <img className="profile__user-avatar" src={avatar} alt="Aratar" />
      <p className="profile__user-name">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
