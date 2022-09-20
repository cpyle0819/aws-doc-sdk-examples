import { SideNavigation } from "@cloudscape-design/components";
import { useNavigate} from "react-router-dom";

const Navigation = ({ items }) => {
  const navigate = useNavigate();

  return (
    <SideNavigation
      onFollow={(event) => {
        if (!event.detail.external) {
          event.preventDefault();
          navigate(event.detail.href);
        }
      }}
      header={{ text: "Elwing 🕊️" }}
      items={items}
    ></SideNavigation>
  );
};

export { Navigation };
