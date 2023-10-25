import { beamsClient } from "./pusherBeams";
import { notificationIconUrl } from "@/constants/utils";

export const pushNotificationToIntrests = ({
  body,
  deep_link,
  title,
  interests,
}: {
  body: string;
  deep_link: string;
  title: string;
  interests: string[];
}) => {
  beamsClient
    .publishToInterests(interests, {
      web: {
        notification: {
          body,
          deep_link,
          title,
          icon: notificationIconUrl,
        },
        data: {
          image: "",
        },
      },
    })
    .then((publishResponse) =>
      console.log("Just published: ", publishResponse.publishId)
    )
    .catch((error) => console.log("Error: ", error));
};

export const pushNotificationToUser = ({
  body,
  deep_link,
  title,
  users,
}: {
  body: string;
  deep_link: string;
  title: string;
  users: string[];
}) => {
  console.log("PUSH REACHED: ", title);

  beamsClient
    .publishToInterests(users, {
      web: {
        notification: {
          body,
          deep_link,
          title,
          icon: notificationIconUrl,
        },
        data: {
          image: "",
        },
      },
    })
    .then((publishResponse) =>
      console.log("Just published: ", publishResponse.publishId)
    )
    .catch((error) => console.log("Error: ", error));
};
