export const getAvatar = (name) => {
  const initials = name.match(/\b\w/g) || [];
  return `${initials.splice(0, 2).join("")}`.toUpperCase();
};

export const getVerificationStatus = (status) => {
  if (status === "APPLIED") {
    return (
      <span className="md:mt-1 w-fit text-sm text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full border border-yellow-300">
        Pending
      </span>
    );
  } else if (status === "APPROVED") {
    return (
      <span className="md:mt-1 w-fit text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-300">
        Verified
      </span>
    );
  } else {
    return (
      <span className="md:mt-1 w-fit text-sm text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-300">
        Rejected
      </span>
    );
  }
};

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const formatDateWithDay = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export const formatTime = (time) => {
  const [h, m] = time.split(":");
  const date = new Date();
  date.setHours(h, m);
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
