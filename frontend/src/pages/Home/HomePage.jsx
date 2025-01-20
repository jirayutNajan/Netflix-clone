import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import Homescreen from "./HomeScreen";

const HomePage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      {user ? <Homescreen /> : <AuthScreen />}
    </div>
  )
}

export default HomePage