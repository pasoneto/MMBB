function d = readJsPsych(fn, index)

file = fileread(fn); 
jsonData = jsondecode(file);
data = jsonData{index}.device_motion_data;
data = struct2table(data);

%Calculate observed sampling rate
time_elapsed = max(data.t) - min(data.t);
originalNSamples = size(data,1);
observedSR = (originalNSamples*1000)/time_elapsed;

%Calculate reported sampling rate
reportedSR = 1000/unique(data.interval);

%Calculates statistics about Inter Sample Interval (ISI)
ISI = diff(data.t);
avgISI = mean(ISI);
sdISI = std(ISI);
maxISI = max(ISI);
minISI = min(ISI);

%Gathering information pre-interpolation
info = table(avgISI, sdISI, maxISI, minISI, observedSR, originalNSamples, reportedSR);

%Interpolate
[time_u unique_indeces] = unique(data.t);
data = data(unique_indeces,:); %It is possible that 2 event recordings happen in the same time slot. This keeps the first

%Interpolated time series
t = (min(data.t):10:max(data.t)); %New time

%non interpolated data
x = interp1(data.t, data.x, t)';
y = interp1(data.t, data.y, t)';
z = interp1(data.t, data.z, t)';

%Gathering and reshaping interpolated data
data = [x, y, z, t'];
%end interpolate

d.type = 'MoCap data';
d.filename = fn;
d.nFrames = size(data, 1); %After interpolation
d.nCameras = [];
d.nMarkers = 1;
d.freq = 100; %After interpolation
d.nAnalog = 0;
d.anaFreq = [];
d.timederOrder = 2; % acceleration data
d.markerName = {'JsPsych'};
d.data = data; 
d.analogdata = [];
d.other = info; %Info about Inter Sample Intervals

end



