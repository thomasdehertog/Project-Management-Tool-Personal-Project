import { Popover, Button } from "antd";
import React from "react";

const CurrentUser = () => {
    return (
        <Popover
            placement="bottomRight"
            trigger="click"
            overlayInnerStyle={{ padding: 0 }}
            overlayStyle={{ zIndex: 999 }}
            content={<div>User Options</div>} // Add appropriate content
        >
            <Button>User</Button>
        </Popover>
    );
};

export default CurrentUser;