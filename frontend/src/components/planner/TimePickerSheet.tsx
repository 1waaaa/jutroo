import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Check, ChevronLeft } from "lucide-react-native";

import { Colors } from "../../theme/colors";
import TimeInput from "./TimeInput";

interface Props {
  title: string;
  min: string;
  max: string;
  start: string;
  end: string;
  fixed: boolean;
  onSelect: (start: string, end: string) => void;
  onBack: () => void;
}

function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);

  return h * 60 + m;
}

function formatTime(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;

  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function snapTo30(minutes: number) {
  return Math.round(minutes / 30) * 30;
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins} min`;
  }

  if (mins === 0) {
    return `${hours}h`;
  }

  return `${hours}h ${mins}m`;
}

export default function TimePickerSheet({
  title,
  min,
  max,
  start,
  end,
  fixed,
  onSelect,
  onBack,
}: Props) {
  const minMinutes = toMinutes(min);
  const maxMinutes = toMinutes(max);

  const [selectedStart, setSelectedStart] = useState(toMinutes(start));

  const [selectedEnd, setSelectedEnd] = useState(toMinutes(end));

  const [timelineWidth, setTimelineWidth] = useState(
    Dimensions.get("window").width - 104,
  );

  const startRef = useRef(toMinutes(start));
  const endRef = useRef(toMinutes(end));

  const dragStartRef = useRef(0);
  const dragEndRef = useRef(0);

  useEffect(() => {
    startRef.current = selectedStart;
  }, [selectedStart]);

  useEffect(() => {
    endRef.current = selectedEnd;
  }, [selectedEnd]);

  const points = useMemo(() => {
    const result: number[] = [];

    for (let time = minMinutes; time <= maxMinutes; time += 30) {
      result.push(time);
    }

    return result;
  }, [minMinutes, maxMinutes]);

  function timeToX(time: number) {
    const ratio = (time - minMinutes) / Math.max(maxMinutes - minMinutes, 1);

    return ratio * timelineWidth;
  }

  function xToTime(x: number) {
    const ratio = clamp(x / Math.max(timelineWidth, 1), 0, 1);

    const raw = minMinutes + ratio * (maxMinutes - minMinutes);

    return clamp(snapTo30(raw), minMinutes, maxMinutes);
  }

  const startPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          dragStartRef.current = startRef.current;
        },

        onPanResponderMove: (_, gesture) => {
          const originalX = timeToX(dragStartRef.current);

          const newX = clamp(
            originalX + gesture.dx,
            0,
            timeToX(endRef.current),
          );

          const newTime = xToTime(newX);

          if (newTime <= endRef.current) {
            startRef.current = newTime;
            setSelectedStart(newTime);
          }
        },
      }),
    [timelineWidth, minMinutes, maxMinutes],
  );

  const endPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderGrant: () => {
          dragEndRef.current = endRef.current;
        },

        onPanResponderMove: (_, gesture) => {
          const originalX = timeToX(dragEndRef.current);

          const newX = clamp(
            originalX + gesture.dx,
            timeToX(startRef.current),
            timelineWidth,
          );

          const newTime = xToTime(newX);

          if (newTime >= startRef.current) {
            endRef.current = newTime;
            setSelectedEnd(newTime);
          }
        },
      }),
    [timelineWidth, minMinutes, maxMinutes],
  );

  function handleTimelinePress(event: any) {
    const time = xToTime(event.nativeEvent.locationX);

    const distanceToStart = Math.abs(time - selectedStart);

    const distanceToEnd = Math.abs(time - selectedEnd);

    if (distanceToStart <= distanceToEnd) {
      if (time <= selectedEnd) {
        setSelectedStart(time);
        startRef.current = time;
      }
    } else {
      if (time >= selectedStart) {
        setSelectedEnd(time);
        endRef.current = time;
      }
    }
  }

  function handleConfirm() {
    onSelect(formatTime(selectedStart), formatTime(selectedEnd));
  }

  const startX = timeToX(selectedStart);
  const endX = timeToX(selectedEnd);

  const rangeWidth = Math.max(endX - startX, 0);

  const duration = Math.max(selectedEnd - selectedStart, 0);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          onPress={onBack}
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.pressedSmall,
          ]}
        >
          <ChevronLeft size={21} color={Colors.ink} strokeWidth={2.3} />
        </Pressable>

        {<View style={styles.topSpacer} />}
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.selectedCard}>
        <Text style={styles.selectedTime}>
          {formatTime(selectedStart)}

          <Text style={styles.selectedArrow}>{"  →  "}</Text>

          {formatTime(selectedEnd)}
        </Text>

        <View style={styles.durationPill}>
          <View style={styles.durationDot} />

          <Text style={styles.durationText}>{formatDuration(duration)}</Text>
        </View>
      </View>

      <View style={styles.timelineSection}>
        <View style={styles.timelineLabels}>
          <Text style={styles.timelineLabel}>{formatTime(minMinutes)}</Text>

          <Text style={styles.timelineLabel}>{formatTime(maxMinutes)}</Text>
        </View>

        <View
          style={styles.timeline}
          onLayout={(event) => {
            setTimelineWidth(event.nativeEvent.layout.width);
          }}
          onStartShouldSetResponder={() => true}
          onResponderRelease={handleTimelinePress}
        >
          <View style={styles.baseLine} />

          <View
            pointerEvents="none"
            style={[
              styles.range,
              {
                left: startX,
                width: rangeWidth,
              },
            ]}
          />

          {points.map((time) => {
            const x = timeToX(time);

            const active = time >= selectedStart && time <= selectedEnd;

            return (
              <View
                key={time}
                pointerEvents="none"
                style={[
                  styles.tick,
                  {
                    left: x - 1.5,
                  },
                  active && styles.activeTick,
                ]}
              />
            );
          })}

          <View
            style={[
              styles.handleOuter,
              {
                left: startX - 19,
              },
            ]}
            {...startPanResponder.panHandlers}
          >
            <View style={styles.handleInner} />
          </View>

          <View
            style={[
              styles.handleOuter,
              {
                left: endX - 19,
              },
            ]}
            {...endPanResponder.panHandlers}
          >
            <View style={styles.handleInner} />
          </View>
        </View>
      </View>

      <View style={styles.endpointRow}>
        <View style={styles.endpointWrapper}>
          <Text style={styles.endpointLabel}>
            {fixed ? "START" : "EARLIEST"}
          </Text>

          <TimeInput
            value={formatTime(selectedStart)}
            onChange={(time) => {
              const minutes = toMinutes(time);

              if (minutes >= minMinutes && minutes <= selectedEnd) {
                setSelectedStart(minutes);
                startRef.current = minutes;
              }
            }}
          />
        </View>

        <View style={styles.arrowContainer}>
          <View style={styles.arrowLine} />

          <Text style={styles.arrow}>→</Text>
        </View>

        <View style={styles.endpointWrapper}>
          <Text style={styles.endpointLabel}>{fixed ? "END" : "LATEST"}</Text>

          <TimeInput
            value={formatTime(selectedEnd)}
            onChange={(time) => {
              const minutes = toMinutes(time);

              if (minutes >= selectedStart && minutes <= maxMinutes) {
                setSelectedEnd(minutes);
                endRef.current = minutes;
              }
            }}
          />
        </View>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.doneButton,
          pressed && styles.doneButtonPressed,
        ]}
        onPress={handleConfirm}
      >
        <Text style={styles.doneText}>Done</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingBottom: 18,
  },

  handle: {
    alignSelf: "center",
    width: 42,
    height: 5,
    borderRadius: 999,
    backgroundColor: Colors.handle,
    marginBottom: 18,
  },

  topBar: {
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.mist,
    justifyContent: "center",
    alignItems: "center",
  },

  pressedSmall: {
    opacity: 0.65,
    transform: [{ scale: 0.94 }],
  },

  topLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.8,
    color: Colors.subtitle,
  },

  topSpacer: {
    width: 36,
  },

  header: {
    alignItems: "center",
    marginTop: 18,
    marginBottom: 22,
  },

  title: {
    fontSize: 29,
    lineHeight: 34,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: Colors.ink,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 7,
    fontSize: 14,
    lineHeight: 20,
    color: Colors.subtitle,
    textAlign: "center",
  },

  selectedCard: {
    backgroundColor: Colors.waterLight,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(124,184,232,0.22)",
    paddingVertical: 21,
    paddingHorizontal: 18,
    alignItems: "center",
  },

  selectedLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.subtitle,
    marginBottom: 8,
  },

  selectedTime: {
    fontSize: 30,
    fontWeight: "800",
    letterSpacing: -1,
    color: Colors.ink,
  },

  selectedArrow: {
    color: Colors.water,
  },

  durationPill: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 11,
    paddingHorizontal: 11,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.76)",
  },

  durationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.success,
    marginRight: 6,
  },

  durationText: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.subtitle,
  },

  timelineSection: {
    marginTop: 29,
    marginBottom: 23,
  },

  timelineLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  timelineLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: Colors.subtitle,
  },

  timeline: {
    height: 58,
    justifyContent: "center",
    position: "relative",
  },

  baseLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 7,
    borderRadius: 999,
    backgroundColor: Colors.mist,
  },

  range: {
    position: "absolute",
    height: 7,
    borderRadius: 999,
    backgroundColor: Colors.water,
  },

  tick: {
    position: "absolute",
    top: 27,
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: Colors.handle,
  },

  activeTick: {
    backgroundColor: Colors.water,
  },

  handleOuter: {
    position: "absolute",
    top: 10,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: "rgba(124,184,232,0.25)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,

    shadowColor: Colors.ink,
    shadowOpacity: 0.15,
    shadowRadius: 11,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  handleInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.water,
  },

  endpointRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginBottom: 22,
  },

  endpointWrapper: {
    flex: 1,
  },

  endpointLabel: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.subtitle,
    textAlign: "center",
    marginBottom: 7,
  },

  arrowContainer: {
    width: 34,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16,
  },

  arrowLine: {
    position: "absolute",
    width: 22,
    height: 1,
    backgroundColor: Colors.border,
  },

  arrow: {
    fontSize: 20,
    color: Colors.subtitle,
    backgroundColor: Colors.ivory,
    paddingHorizontal: 4,
  },

  doneButton: {
    height: 58,
    borderRadius: 20,
    backgroundColor: Colors.ink,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    shadowColor: Colors.ink,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 7,
    },

    elevation: 5,
  },

  doneButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },

  doneText: {
    fontSize: 17,
    fontWeight: "800",
    color: Colors.ivory,
    letterSpacing: -0.2,
  },

  doneIcon: {
    width: 27,
    height: 27,
    borderRadius: 13.5,
    marginLeft: 9,
    backgroundColor: Colors.waterLight,
    justifyContent: "center",
    alignItems: "center",
  },
});
