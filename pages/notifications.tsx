//import Head from "next/head";
import axios from "axios";
import Link from "next/link";
import { Notification } from ".";
import { BiArrowBack as BackIcon } from "react-icons/bi";

export async function getStaticProps() {
  console.log("FETCHING");
  const response = await axios.get(
    "https://results-restapi.herokuapp.com/notifications"
  );
  const data: Notification[] = await response.data;
  return {
    props: {
      notifications: data,
    },
  };
}

export interface Props {
  notifications: Notification[];
}

export default ({ notifications }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
      <Link href="/">
        <div className="flex flex-row items-center justify-between">
          <BackIcon size="1.5rem" className="mt-6 mr-2 text-gray-400" />
          <h3 className="text-white text-2xl font-bold mt-6">
            Latest Notifications
          </h3>
        </div>
      </Link>
      <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
        {notifications.map((item: Notification, idx: number) => (
          <div
            key={idx}
            className="text-white p-6 mt-6 text-left border  border-gray-700 w-96 rounded-xl"
          >
            <h3 className="text-sky-400 text-xl font-bold p-6 text-center">
              {item.notification_date}
            </h3>
            <p className="mt-4 text-m text-center">
              {item.notification_description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
