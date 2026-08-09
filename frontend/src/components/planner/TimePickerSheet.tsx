import { useEffect, useMemo, useRef, useState } from "react";

import {
  Dimensions,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { ArrowLeft } from "lucide-react-native";

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

  /*
   * Width of the timeline.
   *
   * We use a fixed internal width so that
   * the drag calculation stays predictable.
   */
  const [timelineWidth, setTimelineWidth] = useState(0);

  const timelineRef = useRef<View>(null);

  const startRef = useRef(selectedStart);

  const endRef = useRef(selectedEnd);

  useEffect(() => {
    startRef.current = selectedStart;
  }, [selectedStart]);

  useEffect(() => {
    endRef.current = selectedEnd;
  }, [selectedEnd]);

  /*
   * Generate 30-minute points.
   */
  const points = useMemo(() => {
    const result: number[] = [];

    for (let time = minMinutes; time <= maxMinutes; time += 30) {
      result.push(time);
    }

    return result;
  }, [minMinutes, maxMinutes]);

  /*
   * Convert time → X coordinate.
   */
  function timeToX(time: number) {
    if (timelineWidth === 0) {
      return 0;
    }

    const ratio = (time - minMinutes) / (maxMinutes - minMinutes);

    return ratio * timelineWidth;
  }

  /*
   * Convert X coordinate → time.
   */
  function xToTime(x: number) {
    if (timelineWidth === 0) {
      return minMinutes;
    }

    const ratio = x / timelineWidth;

    const raw = minMinutes + ratio * (maxMinutes - minMinutes);

    const snapped = snapTo30(raw);

    return clamp(snapped, minMinutes, maxMinutes);
  }

  /*
   * LEFT HANDLE
   */
  const startPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (_, gesture) => {
          const currentX = timeToX(startRef.current);

          const newX = clamp(
            currentX + gesture.dx,

            0,

            timeToX(endRef.current),
          );

          const newTime = xToTime(newX);

          /*
           * Never allow start to
           * pass end.
           */
          if (newTime <= endRef.current) {
            setSelectedStart(newTime);
          }
        },

        onPanResponderRelease: () => {
          startRef.current = selectedStart;
        },
      }),
    [timelineWidth, minMinutes, maxMinutes, selectedStart, selectedEnd],
  );

  /*
   * RIGHT HANDLE
   */
  const endPanResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (_, gesture) => {
          const currentX = timeToX(endRef.current);

          const newX = clamp(
            currentX + gesture.dx,

            timeToX(startRef.current),

            timelineWidth,
          );

          const newTime = xToTime(newX);

          /*
           * Never allow end to
           * move before start.
           */
          if (newTime >= startRef.current) {
            setSelectedEnd(newTime);
          }
        },

        onPanResponderRelease: () => {
          endRef.current = selectedEnd;
        },
      }),
    [timelineWidth, minMinutes, maxMinutes, selectedStart, selectedEnd],
  );

  /*
   * Tapping the timeline itself.
   *
   * We move whichever handle is
   * closer to the tapped position.
   */
  function handleTimelinePress(event: any) {
    const x = event.nativeEvent.locationX;

    const time = xToTime(x);

    const distanceToStart = Math.abs(time - selectedStart);

    const distanceToEnd = Math.abs(time - selectedEnd);

    if (distanceToStart <= distanceToEnd) {
      if (time <= selectedEnd) {
        setSelectedStart(time);
      }
    } else {
      if (time >= selectedStart) {
        setSelectedEnd(time);
      }
    }
  }

  function handleConfirm() {
    onSelect(formatTime(selectedStart), formatTime(selectedEnd));
  }

  const startX = timeToX(selectedStart);

  const endX = timeToX(selectedEnd);

  const rangeWidth = Math.max(endX - startX, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.selectedCard}>
        <Text style={styles.selectedLabel}>
          {fixed ? "YOUR TIME" : "POSSIBLE START WINDOW"}
        </Text>

        <Text style={styles.selectedTime}>
          {fixed
            ? `${formatTime(selectedStart)} → ${formatTime(selectedEnd)}`
            : `${formatTime(selectedStart)} – ${formatTime(selectedEnd)}`}
        </Text>

        {!fixed && (
          <Text style={styles.helper}>
            Your activity can start anywhere within this window.
          </Text>
        )}
      </View>

      <View style={styles.timelineSection}>
        <View style={styles.timelineLabels}>
          <Text style={styles.timelineLabel}>{formatTime(minMinutes)}</Text>

          <Text style={styles.timelineLabel}>{formatTime(maxMinutes)}</Text>
        </View>

        <View
          ref={timelineRef}
          style={styles.timeline}
          onLayout={(event) => {
            setTimelineWidth(event.nativeEvent.layout.width);
          }}
          onStartShouldSetResponder={() => true}
          onResponderRelease={handleTimelinePress}
        >
          <View style={styles.baseLine} />

          {timelineWidth > 0 && (
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
          )}

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
                    left: x - 2,
                  },
                  active && styles.activeTick,
                ]}
              />
            );
          })}

          {timelineWidth > 0 && (
            <View
              style={[
                styles.handle,
                {
                  left: startX - 14,
                },
              ]}
              {...startPanResponder.panHandlers}
            >
              <View style={styles.handleInner} />
            </View>
          )}

          {timelineWidth > 0 && (
            <View
              style={[
                styles.handle,
                {
                  left: endX - 14,
                },
              ]}
              {...endPanResponder.panHandlers}
            >
              <View style={styles.handleInner} />
            </View>
          )}
        </View>
      </View>

      <View style={styles.endpointRow}>
        <TimeInput
          label={fixed ? "START" : "EARLIEST"}
          value={formatTime(selectedStart)}
          onChange={(time) => {
            const minutes = toMinutes(time);

            if (minutes >= minMinutes && minutes <= selectedEnd) {
              setSelectedStart(minutes);
            }
          }}
        />

        <Text style={styles.arrow}>→</Text>

        <TimeInput
          label={fixed ? "END" : "LATEST"}
          value={formatTime(selectedEnd)}
          onChange={(time) => {
            const minutes = toMinutes(time);

            if (minutes >= selectedStart && minutes <= maxMinutes) {
              setSelectedEnd(minutes);
            }
          }}
        />
      </View>

      <Pressable style={styles.confirmButton} onPress={handleConfirm}>
        <Text style={styles.confirmText}>Use This Time</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },

  backRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    marginBottom: 20,
  },

  backText: {
    fontSize: 16,

    fontWeight: "600",

    color: Colors.primary,
  },

  title: {
    fontSize: 28,

    fontWeight: "700",

    color: Colors.text,

    textAlign: "center",

    marginBottom: 22,
  },

  selectedCard: {
    backgroundColor: "#F8FBFF",

    borderRadius: 22,

    borderWidth: 1,

    borderColor: "#D8E8FA",

    paddingVertical: 18,

    paddingHorizontal: 18,

    alignItems: "center",

    marginBottom: 30,
  },

  selectedLabel: {
    fontSize: 11,

    fontWeight: "800",

    letterSpacing: 1.2,

    color: Colors.subtitle,

    marginBottom: 7,
  },

  selectedTime: {
    fontSize: 29,

    fontWeight: "800",

    color: Colors.primary,
  },

  helper: {
    marginTop: 8,

    fontSize: 13,

    color: Colors.subtitle,

    textAlign: "center",

    lineHeight: 18,
  },

  timelineSection: {
    marginBottom: 30,
  },

  timelineLabels: {
    flexDirection: "row",

    justifyContent: "space-between",

    marginBottom: 10,

    paddingHorizontal: 2,
  },

  timelineLabel: {
    fontSize: 12,

    fontWeight: "600",

    color: Colors.subtitle,
  },

  timeline: {
    height: 64,

    justifyContent: "center",

    position: "relative",
  },

  baseLine: {
    position: "absolute",

    left: 0,

    right: 0,

    height: 6,

    borderRadius: 999,

    backgroundColor: Colors.border,
  },

  range: {
    position: "absolute",

    height: 8,

    borderRadius: 999,

    backgroundColor: Colors.primary,

    opacity: 0.3,
  },

  tick: {
    position: "absolute",

    width: 4,

    height: 4,

    borderRadius: 2,

    top: 30,

    backgroundColor: Colors.border,
  },

  activeTick: {
    backgroundColor: Colors.primary,
  },

  handle: {
    position: "absolute",

    top: 16,

    width: 28,

    height: 28,

    borderRadius: 14,

    backgroundColor: Colors.primary,

    borderWidth: 4,

    borderColor: "#FFFFFF",

    elevation: 3,

    shadowColor: "#000",

    shadowOpacity: 0.12,

    shadowRadius: 5,

    shadowOffset: {
      width: 0,
      height: 2,
    },

    justifyContent: "center",

    alignItems: "center",
  },

  handleInner: {
    width: 6,

    height: 6,

    borderRadius: 3,

    backgroundColor: "#FFFFFF",
  },

  endpointRow: {
    flexDirection: "row",

    alignItems: "center",

    gap: 10,

    marginBottom: 24,
  },

  endpointCard: {
    flex: 1,

    backgroundColor: Colors.surface,

    borderRadius: 18,

    borderWidth: 1,

    borderColor: Colors.border,

    paddingVertical: 13,

    alignItems: "center",
  },

  endpointCardActive: {
    borderColor: Colors.primary,
  },

  endpointLabel: {
    fontSize: 10,

    fontWeight: "800",

    letterSpacing: 1,

    color: Colors.subtitle,

    marginBottom: 4,
  },

  endpointTime: {
    fontSize: 21,

    fontWeight: "800",

    color: Colors.text,
  },

  arrow: {
    fontSize: 20,

    color: Colors.subtitle,
  },

  confirmButton: {
    backgroundColor: Colors.primary,

    borderRadius: 18,

    paddingVertical: 17,

    alignItems: "center",

    marginTop: 4,
  },

  confirmText: {
    fontSize: 16,

    fontWeight: "800",

    color: "#FFFFFF",
  },
});
