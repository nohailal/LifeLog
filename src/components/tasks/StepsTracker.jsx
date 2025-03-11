import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { selectSteps, setSteps } from "@/slices/wellnessSlice";

const StepsTracker = () => {
  const dispatch = useDispatch();
  const steps = useSelector(selectSteps);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(setSteps(value));
  };

  return (
    <div>
      <Label htmlFor="steps" className="block font-medium mb-2 text-gray-700">
        Steps Taken
      </Label>
      <div className="relative">
        <Input
          id="steps"
          type="number"
          className="w-full p-3 pr-12"
          value={steps}
          onChange={handleChange}
          placeholder="How many steps today?"
        />
        <div className="absolute right-3 top-3 text-gray-400">👣</div>
      </div>
    </div>
  );
};

export default StepsTracker;