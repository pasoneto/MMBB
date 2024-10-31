cd '/Users/pdealcan/Documents/github/CoE_Neto/code/accelProject/danceGenerator/present/new2/'
addpath('/Users/pdealcan/Documents/github/matlabTools/MocapToolbox/mocaptoolbox2')

load mcdemodata

f = dir("/Users/pdealcan/Documents/github/EDGEk/generatedDance/sliced_predicted/");
fc = f(8).name
%fc = "sliced_11_Vasso_Bachata_01_poses.csv"
pathTrue = strcat('/Users/pdealcan/Documents/github/EDGEk/data/original_csv/', fc);
pathPred = strcat('/Users/pdealcan/Documents/github/EDGEk/generatedDance/sliced_predicted/', fc);
        
True = strcat(pathTrue);
pred = strcat(pathPred);

True = readtable(True);
pred = readtable(pred);

True = table2array(True);
pred = table2array(pred);

%Adding to matlab object
df = dance1;
df.nFrames = height(True);
df.nMarkers = width(True)/3;
df.freq = 60;

trueD = df;
predE = df;

trueD.data = True;
predE.data = pred;
trueD.nMarkers=width(trueD.data)/3
predE.nMarkers=width(predE.data)/3

   
%Resampling to the same as AIST++
trueD.nFrames = height(trueD.data)
predE.nFrames = height(predE.data)

%Parameters for aist dataset
par = mcinitanimpar
par.msize = 8
par.output = "mp4";
par.videoformat = 'mp4'
par.conn = [1 2; 1 3; 1 4; 3 6; 2 5; 3 6; 4 7; 5 8; 6 9; 9 12; 8 11; 7 10; 10 13; 13 16; 10 14; 10 15; 14 17; 15 18; 18 20; 17 19; 20 22; 19 21; 21 23; 22 24];
par.markercolors='bbbbbbbbbbbbbbbbbbbbbbbb'        

par2 = mcinitanimpar
par2.msize = 8
par2.output = "mp4";
par2.videoformat = 'mp4'
par2.conn = [1 2; 1 3; 1 4; 3 6; 2 5; 3 6; 4 7; 5 8; 6 9; 9 12; 8 11; 7 10; 10 13; 13 16; 10 14; 10 15; 14 17; 15 18; 18 20; 17 19; 20 22; 19 21; 21 23; 22 24];
par2.markercolors='rrrrrrrrrrrrrrrrrrrrrrrr'

trueD = mccenter(trueD);
predE = mccenter(predE);

[all, allparams] = mcmerge(trueD, mctranslate(predE, [2 0 0]), par, par2);

all.freq = 120;
allparams.videoformat = "mp4";

% allparams.output = strrep(nameChosen, "csv", "mp4");    
mcanimate(all, allparams);

