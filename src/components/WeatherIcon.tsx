import {
  IconSun,
  IconCloudFilled,
  IconCloudRain,
  IconCloudSnow,
  IconCloud,
  IconThermometer,
} from "@tabler/icons-react";

interface WeatherIconProps {
  condition: string;
  className: string;
}

const WeatherIcon = ({ condition, className }: WeatherIconProps) => {
  const iconProps = { className: className || "w-16 h-16" };

  // Colors for light theme
  switch (condition) {
    case "sunny":
      return (
        <IconSun
          {...iconProps}
          className={`${iconProps.className} text-yellow-500`}
        />
      );
    case "cloudy":
      return (
        <IconCloudFilled
          {...iconProps}
          className={`${iconProps.className} text-gray-500`}
        />
      );
    case "rainy":
      return (
        <IconCloudRain
          {...iconProps}
          className={`${iconProps.className} text-blue-500`}
        />
      );
    case "snowy":
      return (
        <IconCloudSnow
          {...iconProps}
          className={`${iconProps.className} text-blue-200`}
        />
      );
    case "partly-cloudy":
      return (
        <IconCloud
          {...iconProps}
          className={`${iconProps.className} text-gray-400`}
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
