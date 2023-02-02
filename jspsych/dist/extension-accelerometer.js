var jsPsychExtensionAccelerometer = (function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class MouseTrackingExtension {
        constructor(jsPsych) {
            this.jsPsych = jsPsych;
            this.initialize = ({ minimum_sample_time = 0 }) => __awaiter(this, void 0, void 0, function* () {
                this.domObserver = new MutationObserver(this.mutationObserverCallback);
                this.minimumSampleTime = minimum_sample_time;
            });
            this.on_start = (params) => {

                if (
                  DeviceMotionEvent &&
                  typeof DeviceMotionEvent.requestPermission === "function"
                ) {
                  DeviceMotionEvent.requestPermission().then(response => {
                    console.log(response)
                  });
                }
                params = params || {};
                this.currentTrialData = [{x: [], y: [], z: [], t: []}];
                this.currentTrialTargets = new Map();
                this.currentTrialSelectors = params.targets || [];
                this.lastSampleTime = null;
                this.eventsToTrack = params.events || ["devicemotion"];
                this.domObserver.observe(this.jsPsych.getDisplayElement(), { childList: true });

            };
            this.on_load = () => {
                // set current trial start time
                this.currentTrialStartTime = performance.now();
                // start data collection
                if (this.eventsToTrack.includes("devicemotion")) {
                    window.addEventListener("devicemotion", this.accelEventHandler, true);
                }
            };
            this.on_finish = () => {
                this.domObserver.disconnect();
                if (this.eventsToTrack.includes("devicemotion")) {
                    window.removeEventListener("devicemotion", this.accelEventHandler, true);
                }
                return {
                    accelerometer_data: this.currentTrialData,
                };
            };
            this.accelEventHandler = (eventA) => {

                const event_time = performance.now();
                const t = Math.round(event_time - this.currentTrialStartTime);

                var x = eventA.acceleration.x;
                var y = eventA.acceleration.y;
                var z = eventA.acceleration.z;

                var audioPlayed = window.context.currentTime - window.startTime

                //var rotationAlpha = eventA.rotationRate.alpha;
                //var rotationBeta = eventA.rotationRate.beta;
                //var rotationGama = eventA.rotationRate.gamma;

                var interval = eventA.interval; //gets interval between samples in ms

                this.lastSampleTime = event_time;
                
                this.currentTrialData[0]['x'].push(x);
                this.currentTrialData[0]['y'].push(y);
                this.currentTrialData[0]['z'].push(z);

                this.currentTrialData[0]['timeAudio'].push(audioPlayed);
              
                //alpha
                //The rate at which the device is rotating about its Z axis; that is, being twisted about a line perpendicular to the screen.

                //beta
                //The rate at which the device is rotating about its X axis; that is, front to back.

                //gamma
                //The rate at which the device is rotating about its Y axis; that is, side to side.

                //this.currentTrialData[0]['alpha'].push(rotationAlpha);
                //this.currentTrialData[0]['beta'].push(rotationBeta);
                //this.currentTrialData[0]['gama'].push(rotationGama);

                this.currentTrialData[0]['t'].push(t);

            };
            this.mutationObserverCallback = (mutationsList, observer) => {
                for (const selector of this.currentTrialSelectors) {
                    if (!this.currentTrialTargets.has(selector)) {
                        const target = this.jsPsych.getDisplayElement().querySelector(selector);
                        if (target) {
                            this.currentTrialTargets.set(selector, target.getBoundingClientRect());
                        }
                    }
                }
            };
        }
    }
    MouseTrackingExtension.info = {
        name: "mouse-tracking",
    };

    return MouseTrackingExtension;

})();
