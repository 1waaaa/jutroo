import { Pressable, StyleSheet, Text, View } from "react-native";

import { ArrowRight, Clock3 } from "lucide-react-native";

import { Colors } from "../../theme/colors";
import { ScheduleItem } from "../../mock/schedule";
import { useDayTheme } from "../../context/DayThemeContext";
import { ACTIVITY_ICONS } from "../../constants/activityIcons";

interface Props {
  schedule: ScheduleItem[];
  onPress: () => void;
}

function getActivityIcon(title: string) {
  const key = title.trim().toUpperCase();

  return ACTIVITY_ICONS[key] ?? Clock3;
}

function toMinutes(time: string) {
  const [hours, minutes] = time.split(":").map(Number);

  return hours * 60 + minutes;
}

function isCurrentActivity(item: ScheduleItem) {
  const now = new Date();

  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return (
    currentMinutes >= toMinutes(item.start) &&
    currentMinutes < toMinutes(item.end)
  );
}

export default function TodayScheduleCard({ schedule, onPress }: Props) {
  const { isDark } = useDayTheme();

  const textColor = isDark ? "#FFFFFF" : Colors.text;

  const secondaryColor = isDark ? "rgba(255,255,255,0.58)" : Colors.subtitle;

  const lineColor = isDark ? "rgba(255,255,255,0.16)" : Colors.handle;

  const inactiveDotColor = isDark ? "rgba(255,255,255,0.38)" : Colors.handle;

  const iconColor = isDark ? "#FFFFFF" : Colors.ink;

  const iconBackground = isDark
    ? "rgba(255,255,255,0.08)"
    : "rgba(255,255,255,0.42)";

  const activeIconBackground = isDark
    ? "rgba(217,130,114,0.18)"
    : Colors.softCoral;

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={onPress}>
        <View>
          <Text
            style={[
              styles.eyebrow,
              {
                color: secondaryColor,
              },
            ]}
          >
            TODAY
          </Text>

          <Text
            style={[
              styles.title,
              {
                color: textColor,
              },
            ]}
          >
            Your day at a glance
          </Text>
        </View>

        <View
          style={[
            styles.arrowButton,
            {
              backgroundColor: isDark
                ? "rgba(255,255,255,0.10)"
                : "rgba(255,255,255,0.45)",
            },
          ]}
        >
          <ArrowRight size={18} color={textColor} strokeWidth={2.2} />
        </View>
      </Pressable>

      {schedule.length === 0 ? (
        <Pressable style={styles.empty} onPress={onPress}>
          <Text
            style={[
              styles.emptyTitle,
              {
                color: textColor,
              },
            ]}
          >
            Nothing planned yet
          </Text>

          <Text
            style={[
              styles.emptySubtitle,
              {
                color: secondaryColor,
              },
            ]}
          >
            Create your plan for today.
          </Text>
        </Pressable>
      ) : (
        <View style={styles.timeline}>
          {schedule.slice(0, 4).map((item, index) => {
            const Icon = getActivityIcon(item.title);

            const active = isCurrentActivity(item);

            const visibleItems = Math.min(schedule.length, 4);

            const isLast = index === visibleItems - 1;

            return (
              <Pressable key={item.id} style={styles.item} onPress={onPress}>
                <View style={styles.timeColumn}>
                  <Text
                    style={[
                      styles.time,
                      {
                        color: active ? Colors.coral : textColor,
                      },
                    ]}
                  >
                    {item.start}
                  </Text>

                  <Text
                    style={[
                      styles.endTime,
                      {
                        color: secondaryColor,
                      },
                    ]}
                  >
                    {item.end}
                  </Text>
                </View>

                <View style={styles.lineColumn}>
                  {!isLast && (
                    <View
                      style={[
                        styles.line,
                        {
                          backgroundColor: lineColor,
                        },
                      ]}
                    />
                  )}

                  <View
                    style={[
                      styles.dot,
                      {
                        backgroundColor: active
                          ? Colors.coral
                          : inactiveDotColor,
                      },
                      active && styles.activeDot,
                    ]}
                  />
                </View>

                <View
                  style={[
                    styles.activity,
                    active && {
                      backgroundColor: isDark
                        ? "rgba(255,255,255,0.11)"
                        : "rgba(255,255,255,0.30)",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.icon,
                      {
                        backgroundColor: active
                          ? activeIconBackground
                          : iconBackground,
                      },
                    ]}
                  >
                    <Icon
                      size={19}
                      color={active ? Colors.coral : iconColor}
                      strokeWidth={2}
                    />
                  </View>

                  <View style={styles.activityText}>
                    <Text
                      numberOfLines={1}
                      style={[
                        styles.activityTitle,
                        {
                          color: textColor,
                        },
                      ]}
                    >
                      {item.title}
                    </Text>

                    <Text
                      style={[
                        styles.duration,
                        {
                          color: secondaryColor,
                        },
                      ]}
                    >
                      {item.start} — {item.end}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 28,
    marginBottom: 30,
    paddingHorizontal: 4,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2.5,
    marginBottom: 4,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  arrowButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  timeline: {
    paddingTop: 2,
  },

  item: {
    minHeight: 78,
    flexDirection: "row",
  },

  timeColumn: {
    width: 58,
    alignItems: "flex-start",
    paddingTop: 2,
  },

  time: {
    fontSize: 15,
    fontWeight: "700",
  },

  endTime: {
    fontSize: 11,
    fontWeight: "500",
    marginTop: 4,
  },

  lineColumn: {
    width: 26,
    alignItems: "center",
    position: "relative",
  },

  line: {
    position: "absolute",
    top: 13,
    bottom: -2,
    width: 1,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 5,
    zIndex: 2,
  },

  activeDot: {
    width: 11,
    height: 11,
    borderRadius: 5.5,
    marginTop: 3.5,

    shadowColor: Colors.coral,
    shadowOpacity: 0.45,
    shadowRadius: 7,
    shadowOffset: {
      width: 0,
      height: 0,
    },

    elevation: 4,
  },

  activity: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",

    marginLeft: 8,
    marginBottom: 10,

    paddingVertical: 8,
    paddingHorizontal: 8,

    borderRadius: 18,
  },

  icon: {
    width: 42,
    height: 42,
    borderRadius: 14,

    justifyContent: "center",
    alignItems: "center",
  },

  activityText: {
    flex: 1,
    marginLeft: 12,
  },

  activityTitle: {
    fontSize: 16,
    fontWeight: "700",
  },

  duration: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 4,
  },

  empty: {
    paddingVertical: 20,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
  },

  emptySubtitle: {
    fontSize: 14,
    marginTop: 5,
  },
});
