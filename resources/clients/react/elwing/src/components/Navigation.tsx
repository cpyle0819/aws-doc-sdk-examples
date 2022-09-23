/**
 * Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  SideNavigation,
  SideNavigationProps,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

type NavigationItem = SideNavigationProps["items"][0];

interface NavigationProps {
  items: NavigationItem[];
}

const Navigation = ({ items }: NavigationProps) => {
  const navigate = useNavigate();

  return (
    <SideNavigation
      onFollow={(event) => {
        if (!event.detail.external) {
          event.preventDefault();
          navigate(event.detail.href);
        }
      }}
      header={{ text: "Elwing 🕊️", href: "" }}
      items={items}
    ></SideNavigation>
  );
};

export { Navigation, NavigationProps, NavigationItem };
