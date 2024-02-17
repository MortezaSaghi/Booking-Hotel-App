import { MdLocationOn } from "react-icons/md";
import { HiCalendar, HiMinus, HiPlus, HiSearch } from "react-icons/hi";
import { useRef, useState } from "react";
import useOutSideClick from "../../hooks/useOutSideClick";
import { DateRange } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

export default function Header() {
  const [searchParams,setSearchParams] = useSearchParams();
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openDate, setOpenDate] = useState(false);
  const navigate = useNavigate();

  const optionsHandler = (name, opration) => {
    setOptions((pre) => {
      return {
        ...pre,
        [name]: opration === "inc" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handelSearch = ()=>{
    const encodedParames = createSearchParams({
      data:JSON.stringify(date),
      destination,
      options:JSON.stringify(options)
    })
    navigate({
      pathname:"/hotels",
      search:encodedParames.toString()
    })
  }
  return (
    <div className="header">
      <div className="header-search">
        <div className="header-search-item">
          <MdLocationOn className="header-icon location-icon" />
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="where to go?"
            className="header-search-input"
            name="destination"
            id="destination"
          />
          <span className="seperator"></span>
        </div>
        <div className="header-search-item">
          <HiCalendar className="header-icon date-icon" />
          <div
            onClick={() => setOpenDate((pre) => !pre)}
            className="date-drop-down"
          >
            {`${format(date[0].startDate,"dd/MM/yyyy")} to ${format(date[0].endDate,"dd/MM/yyyy")}`}
          </div>
          {openDate && (
            <DateRange
              className="date"
              ranges={date}
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              moveRangeOnFirstSelection={true}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="header-search-item">
          <div
            id="option-drop-down"
            onClick={() => setOpenOptions((open) => !open)}
          >
            {options.adult} adult &bull; {options.children} children &bull;{" "}
            {options.room} room
          </div>
          {openOptions && (
            <QuestOptionList
              options={options}
              optionsHandler={optionsHandler}
              setOpenOptions={setOpenOptions}
            />
          )}
          <span className="seperator"></span>
        </div>
        <div className="header-search-item">
          <button className="header-search-btn" onClick={handelSearch}>
            <HiSearch className="header-icon header-icon__btn" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ------------------- QuestOptionList Component

function QuestOptionList({ options, optionsHandler, setOpenOptions }) {
  const questOptionListRef = useRef();

  useOutSideClick(questOptionListRef, "option-drop-down", () =>
    setOpenOptions(false)
  );
  return (
    <div className="guest-options" ref={questOptionListRef}>
      <OptionItem
        optionsHandler={optionsHandler}
        options={options}
        minLimit="1"
        type="adult"
      />
      <OptionItem
        optionsHandler={optionsHandler}
        options={options}
        minLimit="0"
        type="children"
      />
      <OptionItem
        optionsHandler={optionsHandler}
        options={options}
        minLimit="1"
        type="room"
      />
    </div>
  );
}

// ------------------- OptionItem Component

function OptionItem({ optionsHandler, options, minLimit, type }) {
  return (
    <div className="guest-option-item">
      <span className="option-text">{type}</span>
      <div className="option-counter">
        <button
          className="option-counter-btn"
          onClick={() => optionsHandler(type, "dec")}
          disabled={options[type] <= minLimit}
        >
          <HiMinus />
        </button>
        <span className="option-counter-number">{options[type]}</span>
        <button
          className="option-counter-btn"
          onClick={() => optionsHandler(type, "inc")}
        >
          <HiPlus />
        </button>
      </div>
    </div>
  );
}
