import { JsPsych, JsPsychExtension, JsPsychExtensionInfo } from "jspsych";
interface OnStartParameters {
    /**
     * An array of string selectors. The selectors should identify one unique element on the page.
     * The DOMRect of the element will be stored in the data.
     */
    targets?: Array<string>;
    /**
     * An array of mouse events to track. Can include `"mousemove"`, `"mousedown"`, and `"mouseup"`.
     * @default ['devicemotion']
     */
    events?: Array<string>;
}
declare class DeviceMotionExtension implements JsPsychExtension {
    private jsPsych;
    static info: JsPsychExtensionInfo;
    constructor(jsPsych: JsPsych);
    private domObserver;
    private currentTrialData;
    private currentTrialTargets;
    private currentTrialSelectors;
    private currentTrialStartTime;
    private lastSampleTime;
    private eventsToTrack;
    initialize: () => Promise<void>;
    on_start: (params: OnStartParameters) => void;
    on_load: () => void;
    on_finish: () => {
        device_motion_data: object[];
    };
    private deviceMotionEventHandler;
    private mutationObserverCallback;
}
export default DeviceMotionExtension;
