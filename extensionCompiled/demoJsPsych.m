cd '/Users/pdealcan/Documents/github/accelWeb/extensionCompiled/'
addpath('/Users/pdealcan/Documents/github/matlabTools/MocapToolbox/mocaptoolbox')
a = readJsPsych('./mydata.json', 2);

%MoCap data structure
a

%Interpolated data
a.data

%Basic information about data collection. Before interpolation
a.other

%%%Use MoCap functions
%Visualizing
mcplottimeseries(a, 1, 'dim', 1) %x
mcplottimeseries(a, 1, 'dim', 2) %y
mcplottimeseries(a, 1, 'dim', 3) %z

%Smoothing
jsd = mcsmoothen(a,25);
mcplottimeseries(jsd, 1, 'dim', 3)

%Period analysis
[per, ac, eac, lags, wstart] = mcwindow(@mcperiod, jsd, 2, 0.25);
plot(wstart,per(:,3))
