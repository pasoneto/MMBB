cd '/Users/pdealcan/Documents/github/accelWeb/extensionCompiled/'
addpath('/Users/pdealcan/Documents/github/matlabTools/MocapToolbox/mocaptoolbox')

%%%Error: no index indicating which trial has movement data.
a = mcread();

%%%Read json data
a = mcread('mydata.json', 2);
b = mcread('mydata2.json', 2);

%%%MoCap data structure
a
b

%%%Interpolated data
a.data
b.data

%%%Basic information about data collection. Before interpolation
a.other
b.other

%%%Use MoCap functions
%Visualizing
mcplottimeseries(a, 1, 'dim', 1) %x
mcplottimeseries(a, 1, 'dim', 2) %y
mcplottimeseries(a, 1, 'dim', 3) %z

mcplottimeseries(b, 1, 'dim', 1) %x
mcplottimeseries(b, 1, 'dim', 2) %y
mcplottimeseries(b, 1, 'dim', 3) %z

%%%Smoothing
jsd = mcsmoothen(a,25);
jsd2 = mcsmoothen(b,25);

mcplottimeseries(jsd, 1, 'dim', 3)
mcplottimeseries(jsd2, 1, 'dim', 3)

%%%Period analysis
[per, ac, eac, lags, wstart] = mcwindow(@mcperiod, jsd, 2, 0.25);
plot(wstart,per(:,3))

[per, ac, eac, lags, wstart] = mcwindow(@mcperiod, jsd2, 2, 0.25);
plot(wstart,per(:,3))
plot(wstart,per(:,2))
plot(wstart,per(:,1))

%%%Animate movement data
a.data(:,1) = [];
mcanimate(a)
