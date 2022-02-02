cd '/Users/pdealcan/Documents/github/accelWeb/extensionCompiled/'
addpath('/Users/pdealcan/Documents/github/matlabTools/MocapToolbox/mocaptoolbox')
a = readJsPsych('./mydata.json', 2);

%Basic information about data collection. Before interpolation
a.other
a.data

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

imagesc(eac(:,:,3)), axis xy
     set(gcf,'Position',[40 200 560 420])
     set(gca,'XTick',0:2:32)
     set(gca,'XTickLabel',0.5*(0:2:32))
     set(gca,'YTick',[1 51 101 151 201])
     set(gca,'YTickLabel',[0 0.5 1 1.5 2.0])
     xlabel('Time / secs')
     ylabel('Period /secs')
