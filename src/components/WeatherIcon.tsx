import {
  IconSun,
  IconCloudFilled,
  IconCloudRain,
  IconCloudSnow,
  IconCloud,
  IconCloudStorm,
  IconDroplets,
  IconThermometer,
  IconMoon,
} from "@tabler/icons-react";

interface WeatherIconProps {
  condition: string;
  isNight: boolean;
  className?: string;
}

const WeatherIcon = ({ condition, isNight, className }: WeatherIconProps) => {
  const iconProps = { className: className || "w-16 h-16" };
  const cond = condition.toLowerCase();

  switch (cond) {
    case "clear":
      return isNight ? (
        <IconMoon
          {...iconProps}
          className={`${iconProps.className} text-indigo-300`}
        />
      ) : (
        <IconSun
          {...iconProps}
          className={`${iconProps.className} text-yellow-500`}
        />
      );

    case "clouds":
      return (
        <IconCloudFilled
          {...iconProps}
          className={`${iconProps.className} ${
            isNight ? "text-gray-400" : "text-gray-500"
          }`}
        />
      );

    case "rain":
      return (
        <IconCloudRain
          {...iconProps}
          className={`${iconProps.className} ${
            isNight ? "text-blue-300" : "text-blue-500"
          }`}
        />
      );

    case "drizzle":
      return (
        <IconDroplets
          {...iconProps}
          className={`${iconProps.className} ${
            isNight ? "text-blue-200" : "text-blue-400"
          }`}
        />
      );

    case "thunderstorm":
      return (
        <IconCloudStorm
          {...iconProps}
          className={`${iconProps.className} ${
            isNight ? "text-purple-300" : "text-purple-500"
          }`}
        />
      );

    case "snow":
      return (
        <IconCloudSnow
          {...iconProps}
          className={`${iconProps.className} ${
            isNight ? "text-blue-200" : "text-blue-300"
          }`}
        />
      );

    case "haze":
    case "fog":
    case "mist":
      return (
        <IconCloud
          {...iconProps}
          className={`${iconProps.className} ${
            isNight ? "text-gray-400" : "text-gray-300"
          }`}
        />
      );

    default:
      return (
        <IconThermometer
          {...iconProps}
          className={`${iconProps.className} text-gray-500`}
        />
      );
  }
};

export default WeatherIcon;
