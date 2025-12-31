import Style from "../Explorecourse/ExploreCourses.module.css"
function Explore({ Icon, text }) {
  return (
    <div className={Style.box}>
      <div className={Style.img}>
        <Icon className={Style.icon} />
      </div>
      <p>{text}</p>
    </div>
  );
}

export default Explore;
