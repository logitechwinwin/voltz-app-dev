import { useEffect, useState } from "react";
import moment from "moment";

import { Container } from "../../atom-components";
import TabsComponent from "./shared/tabs-component";
import {
  FilterEventBottomSheet,
  HeaderWithTitle,
  SearchField,
} from "../../components";
import CampaignList from "./shared/campaign-list";
import ChairtyList from "./shared/charity-list";
import { useFetchEventsData } from "../../hooks";
import { useSelector } from "react-redux";

const Events = () => {
  const [isVisible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState("");
  const [typingLoading, setTypingLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    dateAndTime: moment().format("YYYY-MM-DD"),
    SDGs: "",
  });
  const [filterData, setFilterData] = useState("");
  const [shouldFetch, setShouldFetch] = useState(true);
  const perPage = 20;
  const { user } = useSelector((state) => state.storeReducer);

  query = [
    "&excludeExpired=true&exceedAlreadyRegistered=false&activationStatus=active", // campaign
    "&excludeExpired=true&excludeUpcoming=true&excludeDonationComplete=true&activationStatus=active", // charity
  ];
  const { eventsData: fetchData, isLoading } = useFetchEventsData({
    shouldFetch: shouldFetch,
    query: `page=${page}&perPage=${perPage}&search=${searchVal}${filterData}${query[activeStep]}`,
    type: activeStep === 0 ? "campaign" : "charity",
    loader: false,
  });

  const handleLoadMore = () => {
    if (data?.length >= perPage && fetchData?.meta?.totalPages != page) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setData([]);
    setSearchVal("");
    setPage(1);
    setFormData({
      location: "",
      // dateAndTime: moment().format("YYYY-MM-DD"),
      SDGs: "",
    });
    setFilterData("");
  }, [activeStep]);

  useEffect(() => {
    if (!filterData?.length && page > 1) {
      setData((prevData) => [...prevData, ...(fetchData?.items || [])]);
    } else {
      setData(fetchData?.items);
    }
  }, [fetchData]);

  useEffect(() => {
    if (searchVal) {
      setData([]);
      setPage(1);
    }
  }, [searchVal]);

  const TABS = [
    {
      title: "Events",
      Component: () => (
        <CampaignList
          campaignData={data}
          onEndReached={handleLoadMore}
          loading={isLoading}
          page={page}
          perPage={perPage}
          typingLoading={typingLoading}
        />
      ),
    },
    {
      title: "Fundraising",
      Component: () => (
        <ChairtyList
          charityData={data}
          onEndReached={handleLoadMore}
          loading={isLoading}
          page={page}
          perPage={perPage}
          typingLoading={typingLoading}
        />
      ),
    },
  ];

  const convertToQueryString = (formData) => {
    const queryParams = [];

    if (formData.SDGs && Array.isArray(formData.SDGs)) {
      const sdgString = formData.SDGs.map((sdg, i) => `sdgs[${i}]=${sdg}`).join(
        "&"
      );
      queryParams.push(sdgString);
    }

    if (formData.location) {
      queryParams.push(`location=${encodeURIComponent(formData.location)}`);
    }

    if (formData.dateAndTime) {
      queryParams.push(`date=${encodeURIComponent(formData.dateAndTime)}`);
    }

    return queryParams.length > 0 ? `&${queryParams.join("&")}` : "";
  };

  const handleSearch = (data) => {
    const queryString = convertToQueryString(data);
    setFilterData(queryString);
    setVisible(false);
  };

  const onClear = () => {
    setFilterData("");
    // setData([]);
  };

  return (
    <Container>
      <HeaderWithTitle label={"Campaigns"} />
      <SearchField
        rightIcon
        onIconPress={() => setVisible(true)}
        value={searchVal}
        setValue={setSearchVal}
        setShouldFetch={setShouldFetch}
        setLoading={setTypingLoading}
        setData={setData}
      />

      <TabsComponent
        TABS={TABS}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
      <FilterEventBottomSheet
        activeStep={activeStep}
        isVisible={isVisible}
        setVisible={setVisible}
        onSearch={handleSearch}
        onClear={onClear}
        formData={formData}
        setFormData={setFormData}
      />
    </Container>
  );
};

export default Events;
