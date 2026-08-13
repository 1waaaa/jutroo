import { useEffect, useState } from "react";
import { View } from "react-native";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

import DurationSelector from "./DurationSelector";
import FixedToggle from "./FixedToggle";
import TimeSelector from "./TimeSelector";
import TimePickerSheet from "./TimePickerSheet";

import ActivitySummaryCard from "../ActivitySummaryCard/ActivitySummaryCard";

import { Activity, ConfiguredActivity } from "../../constants/activities";

interface Props {
  activity: Activity;

  initialConfiguration?: ConfiguredActivity;

  onSave: (configuration: ConfiguredActivity) => void;

  onPickerChange?: (open: boolean) => void;
}

type PickerType = "none" | "time";

export default function ActivityForm({
  activity,
  initialConfiguration,
  onSave,
  onPickerChange,
}: Props) {
  const isLocked = activity.id === "UNIVERSITY" || activity.id === "WORK";

  const [picker, setPicker] = useState<PickerType>("none");

  const [duration, setDuration] = useState(
    initialConfiguration?.duration ?? 60,
  );

  const [userFixed, setUserFixed] = useState(
    initialConfiguration?.fixed ?? false,
  );

  const fixed = isLocked ? true : userFixed;

  const [earliest, setEarliest] = useState(
    initialConfiguration?.earliest || activity.minTime,
  );

  const [latest, setLatest] = useState(
    initialConfiguration?.latest || activity.maxTime,
  );

  function toMinutes(time: string) {
    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;
  }

  /*
   * Fixed:
   * duration = end - start
   *
   * Flexible:
   * duration is chosen manually.
   */
  useEffect(() => {
    if (!fixed) {
      return;
    }

    const calculatedDuration = toMinutes(latest) - toMinutes(earliest);

    setDuration(Math.max(30, calculatedDuration));
  }, [fixed, earliest, latest]);

  /*
   * Called when the user finishes
   * choosing the time range.
   */
  function handleTimeSelect(start: string, end: string) {
    setEarliest(start);
    setLatest(end);

    setPicker("none");

    onPickerChange?.(false);
  }

  /*
   * Open the time picker.
   */
  function openTimePicker() {
    setPicker("time");

    onPickerChange?.(true);
  }

  /*
   * Close the time picker.
   */
  function closeTimePicker() {
    setPicker("none");

    onPickerChange?.(false);
  }

  function handleSave() {
    onSave({
      type: activity.id,

      duration,

      fixed,

      earliest,

      latest,
    });
  }

  /*
   * TIME PICKER MODE
   *
   * ActivityBottomSheet knows that
   * picker is open and hides its header.
   */
  if (picker === "time") {
    return (
      <TimePickerSheet
        title={fixed ? "Choose Your Time" : "Choose Your Time Window"}
        min={activity.minTime}
        max={activity.maxTime}
        start={earliest}
        end={latest}
        fixed={fixed}
        onBack={closeTimePicker}
        onSelect={handleTimeSelect}
      />
    );
  }

  /*
   * NORMAL FORM
   */

  return (
    <View>
      {!isLocked && <FixedToggle value={userFixed} onChange={setUserFixed} />}

      <TimeSelector
        label={fixed ? "Start & End Time" : "Earliest & Latest Start"}
        value={fixed ? `${earliest} → ${latest}` : `${earliest} – ${latest}`}
        onPress={openTimePicker}
      />

      {!fixed && <DurationSelector value={duration} onChange={setDuration} />}

      <ActivitySummaryCard
        start={earliest}
        end={latest}
        duration={duration}
        fixed={fixed}
      />

      <PrimaryButton
        title="Add Activity"
        onPress={handleSave}
        disabled={false}
      />
    </View>
  );
}
