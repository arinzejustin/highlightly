import Bowser from "bowser";
import type { DeviceInfo } from "$lib/types";

export function getDeviceInfo(): Omit<DeviceInfo, "deviceId"> {
    const parser = Bowser.getParser(window.navigator.userAgent);

    return {
        browser: parser.getBrowserName(),
        browserVersion: parser.getBrowserVersion() || "",
        os: parser.getOSName(),
        osVersion: parser.getOSVersion() || "",
        platform: parser.getPlatformType(),
        engine: parser.getEngineName(),
    };
}
