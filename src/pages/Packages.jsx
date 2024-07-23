import GeneralPage from "./GeneralPage";
import { base_url } from "../utils/url";
import { useState, useEffect } from "react";
import { convertPropsToObject, fetchData } from "../utils";

const neededProps = [
  "id",
  "name",
  "duration",
  "price",
  "no_of_pm",
  "no_of_user",
  "status",
];
const template = convertPropsToObject(neededProps);
const showAllPackages = `${base_url}/get-package`;
const createUrl = `${base_url}/store-package`;
const editUrl = `${base_url}/edit-package`;

const dropdownFields = [
  {
    key: "status",
    title: "status",
    arr: ["Active", "InActive"],
    getOption: (val) => val,
  },
];

const Packages = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [, setSearchText] = useState("");
  const [paginatedData, setPaginatedData] = useState({
    items: [],
    curItems: [],
  });

  const search = (e) => {
    const str = e.target.value;
    setSearchText(str.trim());

    if (str.trim() === "") {
      setPaginatedData((prev) => ({ ...prev, items: data }));
    } else {
      setPaginatedData((prev) => ({
        ...prev,
        items: data.filter((item) =>
          Object.keys(template).some((key) =>
            String(item?.[key])?.toLowerCase()?.includes(str?.toLowerCase())
          )
        ),
      }));
    }
  };

  const modalState = convertPropsToObject([
    "id",
    "name",
    "duration",
    "price",
    "no_of_pm",
    "no_of_user",
    "status",
  ]);

  const createCallback = (res) => {
    const resData = res?.success?.data;
    const newState = [resData, ...data];
    setData(newState);
    setPaginatedData((prev) => ({ ...prev, items: newState }));

    console.log("response ===>", resData);
  };

  const editCallback = (res) => {
    const resData = res?.success?.data;
    const stateCopy = data?.map((e) => (e.id === resData.id ? resData : e));

    setData(stateCopy);
    setPaginatedData((prev) => ({ ...prev, items: stateCopy }));
    console.log("response ===>", resData);
  };

  const props = {
    title: "Packages",
    actionCols: ["Edit"],
    data,
    setData,
    template,
    isLoading,
    search: {
      type: "text",
      onChange: search,
      placeholder: "Search by Name, Duration, Price...",
    },
    pagination: {
      paginatedData,
      setPaginatedData,
      curLength: paginatedData.items.length,
    },
    createModalProps: {
      excludeFields: ["id", "created_at", "updated_at"],
      dropdownFields,
      neededProps,
      createUrl,
      initialState: modalState,
      successCallback: createCallback,
    },
    editModalProps: {
      excludeFields: ["id", "created_at", "updated_at"],
      dropdownFields,
      neededProps,
      editUrl,
      successCallback: editCallback,
      template: modalState,
    },
    tableProps: {
      dollarFields: ["price"],
    },
  };

  useEffect(() => {
    fetchData({
      neededProps,
      url: showAllPackages,
      setIsLoading,
      sort: (data) => data.sort((a, b) => b.id - a.id),
      callback: (data) => {
        setData(data);
        setPaginatedData((prev) => ({ ...prev, items: data }));
      },
    });
  }, []);

  return <GeneralPage {...props} />;
};

export default Packages;
