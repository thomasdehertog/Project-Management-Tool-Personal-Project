import { useGetIdentity } from "@refinedev/core";
import { Button, Popover } from "antd";
import { User } from "@/graphql/schema.types";
import CustomAvatar from "../custom.avatar";

const CurrentUser = () => {
  const { data: user } = useGetIdentity<User>();

  return (
    <Popover 
      placement="bottomRight"
      trigger="click"
      overlayInnerStyle={{ padding: 0 }}
      overlayStyle={{ zIndex: 999 }}
      content={
        <div>User Options</div>
      }
    >
      <CustomAvatar 
        name={user?.name || 'Anonymous'} 
      />
    </Popover>
  );
};

export default CurrentUser;