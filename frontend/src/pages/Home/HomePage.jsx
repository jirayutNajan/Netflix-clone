import AuthScreen from "./AuthScreen";
import Homescreen from "./Homescreen";

const HomePage = () => {
  const user = false;

  return (
    <div>
      {user ? <Homescreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage