import { User } from "lucide-react";
import React, { useMemo, useState } from "react";
import classNames from "classnames";
import "./Avatar.css";
import { generatePastelColor } from "../../utils/colors";

// Helper function to get initials from a name
const getInitials = (name = "") => {
  return name
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
};

export const Avatar = ({
  src,
  name,
  size = "medium", // 'small', 'medium', 'large', 'xlarge'
  bgColor, // ✅ New prop for background color
  textColor, // ✅ New prop for text/icon color
  className,
  ...props
}) => {
  // State to handle image loading errors
  const [hasError, setHasError] = useState(false);
  const randomColors = useMemo(() => generatePastelColor(), []);
  const showImage = src && !hasError;
  const showInitials = !showImage && name;
  const showIcon = !showImage && !name;

  const avatarClasses = classNames(
    "avatar-container",
    `avatar--size-${size}`,
    className
  );

  // Determine the final colors to use
  const finalBgColor = showImage ? "transparent" : bgColor || randomColors.bg;
  const finalTextColor = textColor || randomColors.text;

  // Inline styles for dynamic colors
  const avatarStyles = {
    backgroundColor: finalBgColor,
    color: finalTextColor,
  };

  return (
    <div className={avatarClasses} style={avatarStyles} {...props}>
      {showImage && (
        <img
          src={src}
          alt={name || "User avatar"}
          className="avatar-image"
          onError={() => setHasError(true)}
        />
      )}
      {showInitials && (
        <span className="avatar-initials" aria-label={name}>
          {getInitials(name)}
        </span>
      )}
      {showIcon && (
        <span className="avatar-icon">
          <User />
        </span>
      )}
    </div>
  );
};

// A component for stacking multiple avatars
export const AvatarGroup = ({ children, max = 4, ...props }) => {
  const avatars = React.Children.toArray(children);
  const visibleAvatars = avatars.slice(0, max);
  const hiddenCount = avatars.length - max;

  return (
    <div className="avatar-group-container" {...props}>
      {visibleAvatars}
      {hiddenCount > 0 && (
        <div className="avatar-container avatar--size-medium avatar-excess">
          +{hiddenCount}
        </div>
      )}
    </div>
  );
};
