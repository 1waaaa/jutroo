import { useEffect, useState } from "react";
import { View } from "react-native";

import PrimaryButton from "../PrimaryButton/PrimaryButton";
import BackButton from "../BackButton/BackButton";

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
}

type PickerType = "none" | "start" | "end";

export default function ActivityForm({
  activity,
  initialConfiguration,
  onSave,
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
    initialConfiguration?.earliest ?? activity.minTime,
  );

  const [latest, setLatest] = useState(
    initialConfiguration?.latest ?? activity.maxTime,
  );

  function toMinutes(time: string) {
    const [h, m] = time.split(":").map(Number);

    return h * 60 + m;
  }

  useEffect(() => {
    if (!fixed) return;

    setDuration(Math.max(30, toMinutes(latest) - toMinutes(earliest)));
  }, [fixed, earliest, latest]);

  function handleSave() {
    onSave({
      type: activity.id,
      duration,
      fixed,
      earliest: fixed ? earliest : "",
      latest: fixed ? latest : "",
    });
  }

  if (picker === "start") {
    return (
      <>
        <BackButton onPress={() => setPicker("none")} />

        <TimePickerSheet
          title="Choose Start Time"
          min={activity.minTime}
          max={activity.maxTime}
          value={earliest}
          onSelect={(time) => {
            setEarliest(time);

            if (toMinutes(time) > toMinutes(latest)) {
              setLatest(time);
            }

            setPicker("none");
          }}
        />
      </>
    );
  }

  if (picker === "end") {
    return (
      <>
        <BackButton onPress={() => setPicker("none")} />

        <TimePickerSheet
          title="Choose End Time"
          min={earliest}
          max={activity.maxTime}
          value={latest}
          onSelect={(time) => {
            setLatest(time);

            setPicker("none");
          }}
        />
      </>
    );
  }

  return (
    <View>
      {!fixed && <DurationSelector value={duration} onChange={setDuration} />}

      {!isLocked && <FixedToggle value={userFixed} onChange={setUserFixed} />}

      {fixed && (
        <>
          <TimeSelector
            label="Start Time"
            value={earliest}
            onPress={() => setPicker("start")}
          />

          <TimeSelector
            label="End Time"
            value={latest}
            onPress={() => setPicker("end")}
          />

          <ActivitySummaryCard
            start={earliest}
            end={latest}
            duration={duration}
          />
        </>
      )}

      <PrimaryButton
        title="✨ Add Activity"
        onPress={handleSave}
        disabled={false}
      />
    </View>
  );
}
