export const ACTION_NAME = {
  UPDATE: "UPDATE",
  CREATE: "CREATE",
  DELETE: "DELETE",
  VIEW: "VIEW",
  EXECUTE: "EXECUTE",
  EXECUTE_ALL: "EXECUTE_ALL",
  IDENTIFY: "IDENTIFY",
};

export const SCAN_MODE = {
  FAST_SCAN: "Quét nhanh",
  PING_SCAN: "Quét bằng lệnh ping",
  COMPREHENSIVE_SCAN: "Quét toàn diện",
};

// Convert SCAN_MODE object to array of options
export const ScanModeOptions = Object.entries(SCAN_MODE).map(
  ([key, value]) => ({
    label: value,
    value: key,
  })
);
