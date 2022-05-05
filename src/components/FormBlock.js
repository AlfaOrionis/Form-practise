import { useState } from "react";
import { fetchHandler } from "../tools/tools";

import "./FormBlock.css";

const FormBlock = () => {
  //Inputs value
  const [dishName, setDishName] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [dishType, setDishType] = useState("");
  //pizza
  const [noOfSlices, setNoOfSlices] = useState("");
  const [diameter, setDiameter] = useState("");
  //soup
  const [spiciness, setSpiciness] = useState("");
  //sandwich
  const [breadSlices, setBreadSlices] = useState("");

  //Validation
  const [dishNameValid, setDishNameValid] = useState(true);
  const [prepTimeValid, setPrepTimeValid] = useState(true);
  const [dishTypeValid, setDishTypeValid] = useState(true);
  //pizza
  const [noOfSlicesValid, setNoOfSlicesValid] = useState(true);
  const [diameterValid, setDiameterValid] = useState(true);
  //soup
  const [spicinessValid, setSpicinessValid] = useState(true);
  //sandwich
  const [breadSlicesValid, setBreadSlicesValid] = useState(true);

  const DishValues = {
    name: dishName,
    preparation_time: prepTime,
    type: dishType,
  };

  //Handlers
  const DishNameHandler = (e) => {
    setDishName(e.target.value);
    if (e.target.value.trim().length >= 3 && !dishNameValid) {
      setDishNameValid(true);
    }
  };

  const PrepTimeHandler = (e) => {
    setPrepTime(e.target.value);
    if (e.target.value && !prepTimeValid) {
      setPrepTimeValid(true);
    }
  };

  const DishTypeHandler = (e) => {
    setDishType(e.target.value);
    if (e.target.value && !dishTypeValid) {
      setDishTypeValid(true);
    }
  };

  const NoOfSlicesHandler = (e) => {
    setNoOfSlices(e.target.value * 1);
    if (e.target.value > 0 && !noOfSlicesValid) {
      setNoOfSlicesValid(true);
    }
  };

  const DiameterHandler = (e) => {
    setDiameter(e.target.value * 1);
    if (e.target.value > 0 && !diameterValid) {
      setDiameterValid(true);
    }
  };

  const SpicinessHandler = (e) => {
    setSpiciness(e.target.value * 1);
    if (e.target.value > 0 && !spicinessValid) {
      setSpicinessValid(true);
    }
  };

  const BreadSlicesHandler = (e) => {
    setBreadSlices(e.target.value * 1);
    if (e.target.value > 0 && !breadSlicesValid) {
      setBreadSlicesValid(true);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    //Basic validation
    if (dishName.trim().length < 3) {
      setDishNameValid(false);
    }
    if (!prepTime) {
      setPrepTimeValid(false);
    }
    if (!dishType) {
      setDishTypeValid(false);
    }
    if (dishName.trim().length < 3 || !prepTime || !dishType) {
      return;
    }

    //Pizza case
    if (dishType === "pizza") {
      if (noOfSlices < 1) {
        setNoOfSlicesValid(false);
      }
      if (diameter < 1) {
        setDiameterValid(false);
      }
      if (noOfSlices < 1 || diameter < 1) {
        return;
      }
      fetchHandler({
        ...DishValues,
        no_of_slices: noOfSlices,
        diameter: diameter,
      });
    }
    //Soup case
    if (dishType === "soup") {
      if (spiciness < 1 || spiciness > 10) {
        setSpicinessValid(false);
        return;
      }
      fetchHandler({ ...DishValues, spiciness_scale: spiciness });
    }
    //Sandwich case
    if (dishType === "sandwich") {
      if (breadSlices < 1) {
        setBreadSlicesValid(false);
        return;
      }
      fetchHandler({ ...DishValues, slices_of_bread: breadSlices });
    }
  };

  return (
    <div className="form_container">
      <form onSubmit={submitHandler}>
        <div>
          <label>Dish name</label>
          <input
            type="text"
            placeholder="Enter the dish name"
            onChange={DishNameHandler}
          />
          {!dishNameValid && (
            <p className="invalid_input">Minimum 3 characters required!</p>
          )}
        </div>
        <div>
          <label>Preparation time</label>
          <input
            type="time"
            step={2}
            defaultValue="00:00:00"
            onChange={PrepTimeHandler}
          />
          {!prepTimeValid && (
            <p className="invalid_input">Enter the preparation time</p>
          )}
        </div>
        <div>
          <label>Dish type</label>
          <select onChange={DishTypeHandler} name="pets" id="pet-select">
            <option value="">Please choose the dish type</option>
            <option value="pizza">Pizza</option>
            <option value="soup">Soup</option>
            <option value="sandwich">Sandwich</option>
          </select>
          {!dishTypeValid && <p className="invalid_input">Select dish type!</p>}
        </div>
        {dishType === "pizza" && (
          <>
            <div>
              <label>Number of slices</label>
              <input
                type="number"
                placeholder="Number of slices"
                value={noOfSlices}
                onChange={NoOfSlicesHandler}
              />
              {!noOfSlicesValid && (
                <p className="invalid_input">Enter the number of slices!</p>
              )}
            </div>
            <div>
              <label>Pizza diameter (in cm)</label>
              <input
                type="number"
                placeholder="Pizza diameter"
                value={diameter}
                onChange={DiameterHandler}
              />
              {!diameterValid && (
                <p className="invalid_input">Enter the diameter!</p>
              )}
            </div>
          </>
        )}

        {dishType === "soup" && (
          <>
            <label>Spiciness scale</label>
            <input
              type="number"
              placeholder="Spiciness scale"
              value={spiciness}
              onChange={SpicinessHandler}
            />
            {!spicinessValid && (
              <p className="invalid_input">Spiciness scale must be 1-10</p>
            )}
          </>
        )}

        {dishType === "sandwich" && (
          <>
            <label>Slices of bread</label>
            <input
              type="number"
              placeholder="Slices of bread"
              value={breadSlices}
              onChange={BreadSlicesHandler}
            />
            {!breadSlicesValid && (
              <p className="invalid_input">Enter the number of slices!</p>
            )}
          </>
        )}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormBlock;
